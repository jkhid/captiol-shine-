-- ─── Jobber integration ─────────────────────────────────────────────────────
-- Stores the OAuth credentials for the Capitol Shine → Jobber sync, and
-- annotates each booking row with the Jobber Client + Request IDs (or
-- the failure reason if the sync failed).

create table if not exists public.jobber_credentials (
  id                uuid primary key default gen_random_uuid(),
  access_token      text not null,
  refresh_token     text not null,
  expires_at        timestamptz not null,
  scope             text,
  jobber_account_id text,
  connected_by      text,                       -- email of admin who initiated
  connected_at      timestamptz not null default now(),
  last_refreshed_at timestamptz,
  updated_at        timestamptz not null default now()
);

-- Single-row pattern: enforce only one credential set at a time.
create unique index if not exists jobber_credentials_singleton_idx
  on public.jobber_credentials ((true));

drop trigger if exists jobber_credentials_set_updated_at on public.jobber_credentials;
create trigger jobber_credentials_set_updated_at
  before update on public.jobber_credentials
  for each row execute function public.set_updated_at();

-- RLS: server-only (service-role bypasses). Block all client access.
alter table public.jobber_credentials enable row level security;

-- ─── Add Jobber sync columns to bookings ────────────────────────────────────

alter table public.bookings
  add column if not exists jobber_client_id   text,
  add column if not exists jobber_request_id  text,
  add column if not exists jobber_sync_status text
    check (jobber_sync_status is null or jobber_sync_status in ('pending','synced','failed','skipped')),
  add column if not exists jobber_synced_at   timestamptz,
  add column if not exists jobber_error       text;

create index if not exists bookings_jobber_sync_status_idx
  on public.bookings(jobber_sync_status)
  where jobber_sync_status is not null;
