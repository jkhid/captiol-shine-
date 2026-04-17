-- Capitol Shine — Internal CRM & Scheduling System
-- Adds: clients, cleaners, jobs, reminder_log, calendar_tokens, settings
-- Does NOT modify existing tables: bookings, quotes, referrals
--
-- Apply via: supabase db push
-- Or paste into Supabase Dashboard → SQL Editor

------------------------------------------------------------
-- Extensions (must come before any index using their operator classes)
------------------------------------------------------------

create extension if not exists pg_trgm;

------------------------------------------------------------
-- Helpers
------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

------------------------------------------------------------
-- cleaners
------------------------------------------------------------

create table if not exists public.cleaners (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  name       text not null,
  email      text,
  phone      text,
  color      text not null default '#1B2A4A',
  active     boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cleaners_user_id_idx on public.cleaners(user_id);
create index if not exists cleaners_active_idx on public.cleaners(active);

drop trigger if exists cleaners_set_updated_at on public.cleaners;
create trigger cleaners_set_updated_at
  before update on public.cleaners
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- clients
------------------------------------------------------------

create table if not exists public.clients (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text,
  phone            text,
  address          text,
  service_address  text,
  notes            text,
  tags             text[] not null default '{}',
  source           text,                  -- referral | google_ads | nextdoor | organic | manual
  hear_about       text,
  referral_code    text,
  lead_booking_id  uuid references public.bookings(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists clients_email_idx on public.clients(email);
create index if not exists clients_phone_idx on public.clients(phone);
create index if not exists clients_lead_booking_id_idx on public.clients(lead_booking_id);
create index if not exists clients_name_trgm_idx on public.clients using gin (name gin_trgm_ops);

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- jobs
------------------------------------------------------------

create table if not exists public.jobs (
  id                       uuid primary key default gen_random_uuid(),
  client_id                uuid not null references public.clients(id) on delete restrict,
  assigned_cleaner_id      uuid references public.cleaners(id) on delete set null,
  parent_job_id            uuid references public.jobs(id) on delete set null,

  service_type             text not null
    check (service_type in ('standard','deep','move_in','move_out','airbnb','commercial','post_construction')),
  status                   text not null default 'scheduled'
    check (status in ('scheduled','in_progress','completed','cancelled','no_show')),

  scheduled_date           date not null,
  scheduled_time_start     time not null,
  scheduled_time_end       time not null,

  actual_start_time        timestamptz,
  actual_end_time          timestamptz,
  actual_duration_minutes  integer generated always as (
    case
      when actual_start_time is not null and actual_end_time is not null
      then extract(epoch from (actual_end_time - actual_start_time))::int / 60
      else null
    end
  ) stored,

  price                    numeric(10,2),
  notes                    text,

  recurring                boolean not null default false,
  recurrence_rule          text,  -- RFC 5545 RRULE, e.g. FREQ=WEEKLY;BYDAY=MO

  google_event_id          text,
  reminder_sent_at         timestamptz,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists jobs_scheduled_date_idx on public.jobs(scheduled_date);
create index if not exists jobs_client_id_idx on public.jobs(client_id);
create index if not exists jobs_status_idx on public.jobs(status);
create index if not exists jobs_assigned_cleaner_id_idx on public.jobs(assigned_cleaner_id);
create index if not exists jobs_parent_job_id_idx on public.jobs(parent_job_id);

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- reminder_log (idempotency for reminder cron)
------------------------------------------------------------

create table if not exists public.reminder_log (
  id          uuid primary key default gen_random_uuid(),
  job_id      uuid not null references public.jobs(id) on delete cascade,
  channel     text not null check (channel in ('sms','email')),
  sent_at     timestamptz not null default now(),
  provider_id text
);

create index if not exists reminder_log_job_id_idx on public.reminder_log(job_id);
create index if not exists reminder_log_sent_at_idx on public.reminder_log(sent_at desc);

------------------------------------------------------------
-- calendar_tokens (Google OAuth per-user)
------------------------------------------------------------

create table if not exists public.calendar_tokens (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null unique references auth.users(id) on delete cascade,
  access_token  text not null,
  refresh_token text not null,
  expires_at    timestamptz not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists calendar_tokens_set_updated_at on public.calendar_tokens;
create trigger calendar_tokens_set_updated_at
  before update on public.calendar_tokens
  for each row execute function public.set_updated_at();

------------------------------------------------------------
-- settings (app-wide prefs — reminder hours, default cleaner, etc.)
-- Single-row pattern enforced via unique constraint on `singleton`.
------------------------------------------------------------

create table if not exists public.settings (
  id                       uuid primary key default gen_random_uuid(),
  singleton                boolean not null default true unique,
  reminder_hours_before    integer not null default 24,
  reminder_sms_enabled     boolean not null default true,
  reminder_email_enabled   boolean not null default true,
  google_calendar_user_id  uuid references auth.users(id) on delete set null,
  updated_at               timestamptz not null default now(),
  constraint settings_singleton_check check (singleton = true)
);

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

insert into public.settings (singleton) values (true)
on conflict (singleton) do nothing;

------------------------------------------------------------
-- Row-Level Security
-- v1: authenticated users can read/write all rows.
-- Future: scope per-cleaner via `assigned_cleaner_id in (select id from cleaners where user_id = auth.uid())`.
------------------------------------------------------------

alter table public.cleaners        enable row level security;
alter table public.clients         enable row level security;
alter table public.jobs            enable row level security;
alter table public.reminder_log    enable row level security;
alter table public.calendar_tokens enable row level security;
alter table public.settings        enable row level security;

-- cleaners
drop policy if exists cleaners_auth_all on public.cleaners;
create policy cleaners_auth_all on public.cleaners
  for all to authenticated using (true) with check (true);

-- clients
drop policy if exists clients_auth_all on public.clients;
create policy clients_auth_all on public.clients
  for all to authenticated using (true) with check (true);

-- jobs
-- FUTURE per-cleaner scope (keep as comment):
--   using (assigned_cleaner_id in (select id from public.cleaners where user_id = auth.uid()))
drop policy if exists jobs_auth_all on public.jobs;
create policy jobs_auth_all on public.jobs
  for all to authenticated using (true) with check (true);

-- reminder_log (read-only for authenticated; writes via service role only)
drop policy if exists reminder_log_auth_read on public.reminder_log;
create policy reminder_log_auth_read on public.reminder_log
  for select to authenticated using (true);

-- calendar_tokens (service-role only; no authenticated policies)
-- calendar_tokens deliberately has NO authenticated policies — writes/reads go through service role.

-- settings
drop policy if exists settings_auth_all on public.settings;
create policy settings_auth_all on public.settings
  for all to authenticated using (true) with check (true);

------------------------------------------------------------
-- Seed: one owner cleaner (edit the name/email before running if needed)
------------------------------------------------------------

insert into public.cleaners (name, email, phone, color, active)
select 'Jamal (Owner)', 'capitolhomeservices1@gmail.com', '+17033759132', '#C5A572', true
where not exists (select 1 from public.cleaners);
