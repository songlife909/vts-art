-- Add child English speaking level to applicants
-- Two options: 'basic', 'intermediate' (= intermediate or higher)

do $$
begin
  if not exists (select 1 from pg_type where typname = 'english_level') then
    create type english_level as enum ('basic', 'intermediate');
  end if;
end$$;

alter table applicants
  add column if not exists english_level english_level;
