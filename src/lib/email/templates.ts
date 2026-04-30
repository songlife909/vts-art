import { escapeHtml } from './resend';

export interface ApplicationData {
  childName: string;
  childAge: number | null;
  parentName: string;
  email: string;
  phone: string;
  preferredSession: '10:00' | '11:00' | 'either';
  message: string | null;
  language: 'en' | 'ko';
}

const SESSION_LABEL: Record<ApplicationData['preferredSession'], { en: string; ko: string }> = {
  '10:00': { en: '10:00 AM', ko: '오전 10시' },
  '11:00': { en: '11:00 AM', ko: '오전 11시' },
  either: { en: 'Either time works', ko: '둘 다 가능' },
};

/**
 * Email shown to the applicant immediately after they submit.
 */
export function applicationReceivedEmail(d: ApplicationData) {
  const session = SESSION_LABEL[d.preferredSession][d.language];
  if (d.language === 'ko') {
    return {
      subject: 'VTS 파일럿 수업 신청이 접수되었습니다',
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">신청이 접수되었습니다</h1>
  <p>${escapeHtml(d.parentName)}님, VTS 파일럿 수업에 신청해 주셔서 감사합니다.</p>
  <p>제출하신 내용을 확인 후 곧 다음 안내 이메일을 보내드릴게요.</p>
  <h3>신청 내용</h3>
  <ul>
    <li>자녀 이름: ${escapeHtml(d.childName)}${d.childAge ? ` (${d.childAge}세)` : ''}</li>
    <li>학부모: ${escapeHtml(d.parentName)}</li>
    <li>이메일: ${escapeHtml(d.email)}</li>
    <li>전화: ${escapeHtml(d.phone)}</li>
    <li>희망 시간: ${escapeHtml(session)}</li>
  </ul>
  <p style="color:#666; font-size:14px; margin-top:32px;">
    파일럿 일정: 2026년 5월 16일 (토), Vienna, VA
  </p>
</div>`,
      text: `신청이 접수되었습니다.

${d.parentName}님, VTS 파일럿 수업에 신청해 주셔서 감사합니다.
제출하신 내용을 확인 후 곧 다음 안내 이메일을 보내드릴게요.

[신청 내용]
- 자녀 이름: ${d.childName}${d.childAge ? ` (${d.childAge}세)` : ''}
- 학부모: ${d.parentName}
- 이메일: ${d.email}
- 전화: ${d.phone}
- 희망 시간: ${session}

파일럿 일정: 2026년 5월 16일 (토), Vienna, VA`,
    };
  }
  return {
    subject: 'VTS Pilot Lesson Application Received',
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">Your application is received</h1>
  <p>Hi ${escapeHtml(d.parentName)}, thanks for applying to the VTS pilot lesson.</p>
  <p>We'll review your application and follow up with next steps shortly.</p>
  <h3>Application Details</h3>
  <ul>
    <li>Child: ${escapeHtml(d.childName)}${d.childAge ? ` (age ${d.childAge})` : ''}</li>
    <li>Parent: ${escapeHtml(d.parentName)}</li>
    <li>Email: ${escapeHtml(d.email)}</li>
    <li>Phone: ${escapeHtml(d.phone)}</li>
    <li>Preferred time: ${escapeHtml(session)}</li>
  </ul>
  <p style="color:#666; font-size:14px; margin-top:32px;">
    Pilot date: Saturday, May 16, 2026 — Vienna, VA
  </p>
</div>`,
    text: `Your application is received.

Hi ${d.parentName}, thanks for applying to the VTS pilot lesson.
We'll review your application and follow up with next steps shortly.

[Application Details]
- Child: ${d.childName}${d.childAge ? ` (age ${d.childAge})` : ''}
- Parent: ${d.parentName}
- Email: ${d.email}
- Phone: ${d.phone}
- Preferred time: ${session}

Pilot date: Saturday, May 16, 2026 — Vienna, VA`,
  };
}

/**
 * Email sent to applicant when assigned to a class — confirmation.
 */
export function assignmentConfirmedEmail(
  d: ApplicationData,
  sessionTime: '10:00' | '11:00'
) {
  const session = SESSION_LABEL[sessionTime][d.language];
  if (d.language === 'ko') {
    return {
      subject: '[VTS] 파일럿 수업 배정 완료',
      html: `
<div style="font-family: -apple-system, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">수업이 배정되었습니다</h1>
  <p>${escapeHtml(d.parentName)}님, 안녕하세요.</p>
  <p>${escapeHtml(d.childName)} 어린이의 VTS 파일럿 수업이 아래와 같이 배정되었습니다.</p>
  <div style="background:#f0f9ff; padding:16px; border-radius:12px; margin:16px 0;">
    <p style="margin:0;"><strong>일시:</strong> 2026년 5월 16일 (토) ${escapeHtml(session)}</p>
    <p style="margin:8px 0 0;"><strong>장소:</strong> Vienna, VA</p>
  </div>
  <p>당일 5분 전까지 도착해 주세요. 추가 안내가 필요하시면 이 이메일에 답장 부탁드립니다.</p>
</div>`,
      text: `수업이 배정되었습니다.

${d.parentName}님, ${d.childName} 어린이의 VTS 파일럿 수업이 다음과 같이 배정되었습니다.

일시: 2026년 5월 16일 (토) ${session}
장소: Vienna, VA

당일 5분 전까지 도착해 주세요.`,
    };
  }
  return {
    subject: '[VTS] Pilot lesson confirmed',
    html: `
<div style="font-family: -apple-system, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">Your lesson is confirmed</h1>
  <p>Hi ${escapeHtml(d.parentName)},</p>
  <p>${escapeHtml(d.childName)} is assigned to the following VTS pilot session:</p>
  <div style="background:#f0f9ff; padding:16px; border-radius:12px; margin:16px 0;">
    <p style="margin:0;"><strong>When:</strong> Saturday, May 16, 2026 — ${escapeHtml(session)}</p>
    <p style="margin:8px 0 0;"><strong>Where:</strong> Vienna, VA</p>
  </div>
  <p>Please arrive 5 minutes early. Reply to this email if you have any questions.</p>
</div>`,
    text: `Your lesson is confirmed.

Hi ${d.parentName}, ${d.childName} is assigned to the following VTS pilot session:

When: Saturday, May 16, 2026 — ${session}
Where: Vienna, VA

Please arrive 5 minutes early.`,
  };
}

export function waitlistEmail(d: ApplicationData) {
  if (d.language === 'ko') {
    return {
      subject: '[VTS] 파일럿 수업 대기 안내',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<h2>대기자 명단에 등록되었습니다</h2>
<p>${escapeHtml(d.parentName)}님, 신청해 주셔서 감사합니다.</p>
<p>현재 신청이 마감되어 ${escapeHtml(d.childName)} 어린이를 대기자 명단에 올려드렸습니다.
자리가 나면 즉시 안내드릴게요.</p>
</div>`,
      text: `대기자 명단에 등록되었습니다. 자리가 나면 즉시 안내드립니다.`,
    };
  }
  return {
    subject: '[VTS] Pilot lesson waitlist',
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<h2>You're on the waitlist</h2>
<p>Hi ${escapeHtml(d.parentName)}, thanks for applying.</p>
<p>The pilot is currently full, so we've added ${escapeHtml(d.childName)} to our waitlist.
We'll reach out the moment a spot opens up.</p>
</div>`,
    text: `You're on the waitlist. We'll reach out the moment a spot opens up.`,
  };
}

export function rejectedEmail(d: ApplicationData) {
  if (d.language === 'ko') {
    return {
      subject: '[VTS] 파일럿 수업 신청 안내',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<p>${escapeHtml(d.parentName)}님, 신청해 주셔서 감사합니다.</p>
<p>아쉽게도 이번 파일럿에서는 함께하지 못하게 되었습니다. 다음 기회에 꼭 모실 수 있도록 노력하겠습니다.</p>
</div>`,
      text: `신청해 주셔서 감사합니다. 아쉽게도 이번 파일럿에서는 함께하지 못하게 되었습니다.`,
    };
  }
  return {
    subject: '[VTS] About your pilot application',
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<p>Hi ${escapeHtml(d.parentName)}, thanks for applying.</p>
<p>Unfortunately we won't be able to include ${escapeHtml(d.childName)} in this pilot session. We hope to welcome you in a future cohort.</p>
</div>`,
    text: `Thanks for applying. Unfortunately we won't be able to include you in this pilot.`,
  };
}

/**
 * Email sent to admins when a new application arrives.
 */
export function adminNewApplicationEmail(d: ApplicationData, applicantId: string) {
  const session = SESSION_LABEL[d.preferredSession].en;
  return {
    subject: `[VTS] New pilot application from ${d.parentName}`,
    html: `
<div style="font-family: -apple-system, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h2>New pilot application</h2>
  <ul>
    <li><strong>Child:</strong> ${escapeHtml(d.childName)}${d.childAge ? ` (age ${d.childAge})` : ''}</li>
    <li><strong>Parent:</strong> ${escapeHtml(d.parentName)}</li>
    <li><strong>Email:</strong> ${escapeHtml(d.email)}</li>
    <li><strong>Phone:</strong> ${escapeHtml(d.phone)}</li>
    <li><strong>Preferred:</strong> ${escapeHtml(session)}</li>
    <li><strong>Language:</strong> ${escapeHtml(d.language)}</li>
    ${d.message ? `<li><strong>Message:</strong> ${escapeHtml(d.message)}</li>` : ''}
  </ul>
  <p style="color:#666; font-size:13px;">Applicant ID: ${escapeHtml(applicantId)}</p>
</div>`,
    text: `New pilot application

Child: ${d.childName}${d.childAge ? ` (age ${d.childAge})` : ''}
Parent: ${d.parentName}
Email: ${d.email}
Phone: ${d.phone}
Preferred: ${session}
Language: ${d.language}
${d.message ? `Message: ${d.message}\n` : ''}
Applicant ID: ${applicantId}`,
  };
}
