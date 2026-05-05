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

const HR = `<hr style="border:none; border-top:1px solid #e5e7eb; margin:32px 0;" />`;
const TXT_HR = `\n\n———\n\n`;

/**
 * Email shown to the applicant immediately after they submit.
 * Bilingual: English first, Korean second.
 */
export function applicationReceivedEmail(d: ApplicationData) {
  const sessionEN = SESSION_LABEL[d.preferredSession].en;
  const sessionKO = SESSION_LABEL[d.preferredSession].ko;
  return {
    subject: 'Application Received · 체험수업 신청이 접수되었습니다',
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">Your application is received</h1>
  <p>Hi ${escapeHtml(d.parentName)}, thanks for applying to the Art-based Literacy Lab trial class.</p>
  <p>We'll review your application and follow up with next steps shortly.</p>
  <h3>Application Details</h3>
  <ul>
    <li>Child: ${escapeHtml(d.childName)}${d.childAge ? ` (age ${d.childAge})` : ''}</li>
    <li>Parent: ${escapeHtml(d.parentName)}</li>
    <li>Email: ${escapeHtml(d.email)}</li>
    <li>Phone: ${escapeHtml(d.phone)}</li>
    <li>Preferred time: ${escapeHtml(sessionEN)}</li>
  </ul>
  <p style="color:#666; font-size:14px;">Trial class date: Saturday, May 16, 2026 — Vienna, VA</p>
  ${HR}
  <h1 style="color:#0284c7;">신청이 접수되었습니다</h1>
  <p>${escapeHtml(d.parentName)}님, Art-based Literacy Lab 체험수업에 신청해 주셔서 감사합니다.</p>
  <p>제출하신 내용을 확인 후 곧 다음 안내 이메일을 보내드릴게요.</p>
  <h3>신청 내용</h3>
  <ul>
    <li>자녀 이름: ${escapeHtml(d.childName)}${d.childAge ? ` (${d.childAge}세)` : ''}</li>
    <li>학부모: ${escapeHtml(d.parentName)}</li>
    <li>이메일: ${escapeHtml(d.email)}</li>
    <li>전화: ${escapeHtml(d.phone)}</li>
    <li>희망 시간: ${escapeHtml(sessionKO)}</li>
  </ul>
  <p style="color:#666; font-size:14px;">체험수업 일정: 2026년 5월 16일 (토), Vienna, VA</p>
</div>`,
    text: `Your application is received.

Hi ${d.parentName}, thanks for applying to the Art-based Literacy Lab trial class.
We'll review your application and follow up with next steps shortly.

[Application Details]
- Child: ${d.childName}${d.childAge ? ` (age ${d.childAge})` : ''}
- Parent: ${d.parentName}
- Email: ${d.email}
- Phone: ${d.phone}
- Preferred time: ${sessionEN}

Trial class date: Saturday, May 16, 2026 — Vienna, VA${TXT_HR}신청이 접수되었습니다.

${d.parentName}님, Art-based Literacy Lab 체험수업에 신청해 주셔서 감사합니다.
제출하신 내용을 확인 후 곧 다음 안내 이메일을 보내드릴게요.

[신청 내용]
- 자녀 이름: ${d.childName}${d.childAge ? ` (${d.childAge}세)` : ''}
- 학부모: ${d.parentName}
- 이메일: ${d.email}
- 전화: ${d.phone}
- 희망 시간: ${sessionKO}

체험수업 일정: 2026년 5월 16일 (토), Vienna, VA`,
  };
}

/**
 * Email sent to applicant when assigned to a class — confirmation.
 * Bilingual.
 */
export function assignmentConfirmedEmail(
  d: ApplicationData,
  sessionTime: '10:00' | '11:00'
) {
  const sessionEN = SESSION_LABEL[sessionTime].en;
  const sessionKO = SESSION_LABEL[sessionTime].ko;
  const venue = '1952 Gallows Rd, 3rd floor conference room, Vienna, VA 22182';
  return {
    subject: '[Art-based Literacy Lab] Trial class confirmed · 체험수업 배정 완료',
    html: `
<div style="font-family: -apple-system, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h1 style="color:#0284c7;">Your class is confirmed</h1>
  <p>Hi ${escapeHtml(d.parentName)},</p>
  <p>${escapeHtml(d.childName)} is assigned to the following Art-based Literacy Lab trial class:</p>
  <div style="background:#f0f9ff; padding:16px; border-radius:12px; margin:16px 0;">
    <p style="margin:0;"><strong>When:</strong> Saturday, May 16, 2026 — ${escapeHtml(sessionEN)}</p>
    <p style="margin:8px 0 0;"><strong>Where:</strong> ${venue}</p>
  </div>
  <p>Please arrive 10 minutes early. Reply to this email if you have any questions.</p>
  ${HR}
  <h1 style="color:#0284c7;">수업이 배정되었습니다</h1>
  <p>${escapeHtml(d.parentName)}님, 안녕하세요.</p>
  <p>${escapeHtml(d.childName)} 어린이의 Art-based Literacy Lab 체험수업이 아래와 같이 배정되었습니다.</p>
  <div style="background:#f0f9ff; padding:16px; border-radius:12px; margin:16px 0;">
    <p style="margin:0;"><strong>일시:</strong> 2026년 5월 16일 (토) ${escapeHtml(sessionKO)}</p>
    <p style="margin:8px 0 0;"><strong>장소:</strong> ${venue}</p>
  </div>
  <p>당일 10분 전까지 도착해 주세요. 추가 안내가 필요하시면 이 이메일에 답장 부탁드립니다.</p>
</div>`,
    text: `Your class is confirmed.

Hi ${d.parentName}, ${d.childName} is assigned to the following Art-based Literacy Lab trial class:

When: Saturday, May 16, 2026 — ${sessionEN}
Where: ${venue}

Please arrive 10 minutes early.${TXT_HR}수업이 배정되었습니다.

${d.parentName}님, ${d.childName} 어린이의 Art-based Literacy Lab 체험수업이 다음과 같이 배정되었습니다.

일시: 2026년 5월 16일 (토) ${sessionKO}
장소: ${venue}

당일 10분 전까지 도착해 주세요.`,
  };
}

/**
 * Bilingual waitlist notification.
 */
export function waitlistEmail(d: ApplicationData) {
  return {
    subject: '[Art-based Literacy Lab] Trial class waitlist · 체험수업 대기 안내',
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<h2>You're on the waitlist</h2>
<p>Hi ${escapeHtml(d.parentName)}, thanks for applying.</p>
<p>The trial class is currently full, so we've added ${escapeHtml(d.childName)} to our waitlist.
We'll reach out the moment a spot opens up.</p>
${HR}
<h2>대기자 명단에 등록되었습니다</h2>
<p>${escapeHtml(d.parentName)}님, 신청해 주셔서 감사합니다.</p>
<p>현재 신청이 마감되어 ${escapeHtml(d.childName)} 어린이를 대기자 명단에 올려드렸습니다.
자리가 나면 즉시 안내드릴게요.</p>
</div>`,
    text: `You're on the waitlist. We'll reach out the moment a spot opens up.${TXT_HR}대기자 명단에 등록되었습니다. 자리가 나면 즉시 안내드립니다.`,
  };
}

/**
 * Bilingual rejection notice.
 */
export function rejectedEmail(d: ApplicationData) {
  return {
    subject: '[Art-based Literacy Lab] About your trial class application · 체험수업 신청 안내',
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
<p>Hi ${escapeHtml(d.parentName)}, thanks for applying.</p>
<p>Unfortunately we won't be able to include ${escapeHtml(d.childName)} in this trial class. We hope to welcome you in a future cohort.</p>
${HR}
<p>${escapeHtml(d.parentName)}님, 신청해 주셔서 감사합니다.</p>
<p>아쉽게도 이번 체험수업에서는 함께하지 못하게 되었습니다. 다음 기회에 꼭 모실 수 있도록 노력하겠습니다.</p>
</div>`,
    text: `Thanks for applying. Unfortunately we won't be able to include you in this trial class.${TXT_HR}신청해 주셔서 감사합니다. 아쉽게도 이번 체험수업에서는 함께하지 못하게 되었습니다.`,
  };
}

/**
 * Email sent to admins when a new application arrives.
 * Bilingual subject + EN body (admin internal).
 */
export function adminNewApplicationEmail(d: ApplicationData, applicantId: string) {
  const session = SESSION_LABEL[d.preferredSession].en;
  return {
    subject: `[Art-based Literacy Lab] New application from ${d.parentName} · 신규 신청`,
    html: `
<div style="font-family: -apple-system, sans-serif; max-width:600px; margin:0 auto; padding:24px; color:#111;">
  <h2>New trial class application · 신규 체험수업 신청</h2>
  <ul>
    <li><strong>Child / 자녀:</strong> ${escapeHtml(d.childName)}${d.childAge ? ` (age ${d.childAge})` : ''}</li>
    <li><strong>Parent / 학부모:</strong> ${escapeHtml(d.parentName)}</li>
    <li><strong>Email:</strong> ${escapeHtml(d.email)}</li>
    <li><strong>Phone / 전화:</strong> ${escapeHtml(d.phone)}</li>
    <li><strong>Preferred / 희망 시간:</strong> ${escapeHtml(session)}</li>
    <li><strong>Language / 언어:</strong> ${escapeHtml(d.language)}</li>
    ${d.message ? `<li><strong>Message / 메시지:</strong> ${escapeHtml(d.message)}</li>` : ''}
  </ul>
  <p style="color:#666; font-size:13px;">Applicant ID: ${escapeHtml(applicantId)}</p>
</div>`,
    text: `New trial class application · 신규 체험수업 신청

Child / 자녀: ${d.childName}${d.childAge ? ` (age ${d.childAge})` : ''}
Parent / 학부모: ${d.parentName}
Email: ${d.email}
Phone / 전화: ${d.phone}
Preferred / 희망 시간: ${session}
Language / 언어: ${d.language}
${d.message ? `Message / 메시지: ${d.message}\n` : ''}
Applicant ID: ${applicantId}`,
  };
}
