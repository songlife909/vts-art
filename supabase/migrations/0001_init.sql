-- VTS Pilot — Initial schema
-- Phase 1: applicants, class_sessions, assignments, admins
-- Run in Supabase SQL editor (or via supabase CLI)

-- =========================================================
-- Extensions
-- =========================================================
create extension if not exists "uuid-ossp";

-- =========================================================
-- Enums
-- =========================================================
do $$ begin
  create type applicant_status as enum (
    'new', 'waitlist', 'assigned', 'confirmed', 'cancelled', 'rejected'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type preferred_session as enum ('10:00', '11:00', 'either');
exception when duplicate_object then null; end $$;

do $$ begin
  create type app_language as enum ('en', 'ko');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_role as enum ('owner', 'admin');
exception when duplicate_object then null; end $$;

-- =========================================================
-- Tables
-- =========================================================

-- Admins (whitelist of allowed admin emails). Linked to auth.users via email.
create table if not exists public.admins (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text not null,
  role admin_role not null default 'admin',
  created_at timestamptz not null default now()
);

-- Class sessions (5/16/2026, 10:00 and 11:00)
create table if not exists public.class_sessions (
  id uuid primary key default uuid_generate_v4(),
  date date not null,
  start_time text not null,        -- '10:00' | '11:00' (string for simplicity)
  capacity int not null default 10,
  location text not null default 'Vienna, VA',
  notes text,
  created_at timestamptz not null default now(),
  unique (date, start_time)
);

-- Applicants
create table if not exists public.applicants (
  id uuid primary key default uuid_generate_v4(),
  child_name text not null,
  child_age int,
  parent_name text not null,
  email text not null,
  phone text not null,
  message text,
  preferred_session preferred_session not null default 'either',
  language app_language not null default 'en',
  status applicant_status not null default 'new',
  source text not null default 'pilot-2026-05-16',
  notes text,                       -- internal admin memo
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applicants_status_idx on public.applicants (status);
create index if not exists applicants_created_idx on public.applicants (created_at desc);

-- Assignments (applicant ↔ session). One applicant can be assigned to at most one session.
create table if not exists public.assignments (
  id uuid primary key default uuid_generate_v4(),
  applicant_id uuid not null references public.applicants(id) on delete cascade,
  session_id uuid not null references public.class_sessions(id) on delete restrict,
  assigned_by uuid references public.admins(id) on delete set null,
  assigned_at timestamptz not null default now(),
  notification_sent_at timestamptz,
  unique (applicant_id)             -- one applicant -> one session
);

create index if not exists assignments_session_idx on public.assignments (session_id);

-- =========================================================
-- Trigger: keep applicants.updated_at fresh
-- =========================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists applicants_set_updated_at on public.applicants;
create trigger applicants_set_updated_at
  before update on public.applicants
  for each row execute function public.set_updated_at();

-- =========================================================
-- Helper: is the current auth user an admin?
-- =========================================================
create or replace function public.is_admin()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.admins a
    where a.email = (auth.jwt() ->> 'email')
  );
$$;

-- =========================================================
-- Row-Level Security
-- =========================================================
alter table public.applicants enable row level security;
alter table public.class_sessions enable row level security;
alter table public.assignments enable row level security;
alter table public.admins enable row level security;

-- applicants
drop policy if exists "anon can insert application" on public.applicants;
create policy "anon can insert application"
  on public.applicants for insert
  to anon with check (true);

drop policy if exists "admins can read applicants" on public.applicants;
create policy "admins can read applicants"
  on public.applicants for select
  to authenticated using (public.is_admin());

drop policy if exists "admins can update applicants" on public.applicants;
create policy "admins can update applicants"
  on public.applicants for update
  to authenticated using (public.is_admin()) with check (public.is_admin());

-- class_sessions
drop policy if exists "everyone can read sessions" on public.class_sessions;
create policy "everyone can read sessions"
  on public.class_sessions for select
  to anon, authenticated using (true);

drop policy if exists "admins can modify sessions" on public.class_sessions;
create policy "admins can modify sessions"
  on public.class_sessions for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

-- assignments
drop policy if exists "admins can read assignments" on public.assignments;
create policy "admins can read assignments"
  on public.assignments for select
  to authenticated using (public.is_admin());

drop policy if exists "admins can modify assignments" on public.assignments;
create policy "admins can modify assignments"
  on public.assignments for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

-- admins
drop policy if exists "admins can read admins" on public.admins;
create policy "admins can read admins"
  on public.admins for select
  to authenticated using (public.is_admin());

-- =========================================================
-- Seeds
-- =========================================================

-- Two pilot sessions on 2026-05-16
insert into public.class_sessions (date, start_time, capacity, location)
values
  ('2026-05-16', '10:00', 10, 'Vienna, VA'),
  ('2026-05-16', '11:00', 10, 'Vienna, VA')
on conflict (date, start_time) do nothing;

-- Admin whitelist (REPLACE PLACEHOLDER EMAILS WITH REAL ONES)
insert into public.admins (email, name, role) values
  ('REPLACE_LEE_JUHEON@example.com', '이주헌', 'owner'),
  ('REPLACE_CHOI_EUNJUNG@example.com', '최은정', 'admin'),
  ('REPLACE_KANG_TAEUK@example.com',  '강태욱', 'admin'),
  ('REPLACE_LEE_HYUNJUNG@example.com','이현정', 'admin')
on conflict (email) do nothing;

-- =========================================================
-- Capacity guard: prevent over-booking
-- =========================================================
create or replace function public.enforce_session_capacity()
returns trigger language plpgsql as $$
declare
  current_count int;
  cap int;
begin
  select capacity into cap from public.class_sessions where id = new.session_id;
  select count(*) into current_count from public.assignments where session_id = new.session_id;
  if current_count >= cap then
    raise exception 'Session is full (capacity % reached)', cap;
  end if;
  return new;
end $$;

drop trigger if exists assignments_enforce_capacity on public.assignments;
create trigger assignments_enforce_capacity
  before insert on public.assignments
  for each row execute function public.enforce_session_capacity();

-- =========================================================
-- View: dashboard summary
-- =========================================================
create or replace view public.session_capacity as
select
  cs.id,
  cs.date,
  cs.start_time,
  cs.capacity,
  count(a.id) as assigned_count,
  cs.capacity - count(a.id) as remaining
from public.class_sessions cs
left join public.assignments a on a.session_id = cs.id
group by cs.id;
