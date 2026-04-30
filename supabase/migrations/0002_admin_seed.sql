-- Replace placeholder admin emails with real ones.
-- Safe to re-run: deletes placeholders by email pattern, then upserts.

delete from public.admins where email like 'REPLACE_%@example.com';

insert into public.admins (email, name, role) values
  ('juhunlee@gmail.com',   '이주헌', 'owner'),
  ('islet103@gmail.com',   '최은정', 'admin'),
  ('ktw909@naver.com',     '강태욱', 'admin'),
  ('farseerhy@naver.com',  '이현정', 'admin')
on conflict (email) do update
  set name = excluded.name,
      role = excluded.role;
