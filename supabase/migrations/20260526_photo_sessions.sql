-- ─── Before/After photo capture for property management reports ─────────────
-- Admin creates a session per property → texts the unique upload URL to the
-- cleaner → cleaner uploads before/after photos from their phone → admin
-- clicks "Generate PDF" and uploads the report to the property management
-- portal. Photos auto-archive 30 days after the session is marked submitted.

create table if not exists public.photo_sessions (
  id                uuid primary key default gen_random_uuid(),
  token             text unique not null,
  status            text not null default 'pending'
                    check (status in ('pending','partial','ready','submitted','archived')),

  -- What is being cleaned
  property_address  text not null,
  service_date      date,

  -- Filled in by the cleaner on first photo upload
  cleaner_name      text,

  -- Admin context
  created_by        text,
  notes             text,

  -- Lifecycle timestamps
  created_at        timestamptz not null default now(),
  first_uploaded_at timestamptz,
  ready_at          timestamptz,
  submitted_at      timestamptz,
  archived_at       timestamptz,

  updated_at        timestamptz not null default now()
);

create index if not exists photo_sessions_status_idx     on public.photo_sessions(status);
create index if not exists photo_sessions_created_at_idx on public.photo_sessions(created_at desc);
create index if not exists photo_sessions_token_idx      on public.photo_sessions(token);

drop trigger if exists photo_sessions_set_updated_at on public.photo_sessions;
create trigger photo_sessions_set_updated_at
  before update on public.photo_sessions
  for each row execute function public.set_updated_at();

create table if not exists public.photo_session_photos (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.photo_sessions(id) on delete cascade,
  category     text not null check (category in ('before','after')),
  storage_path text not null,
  width        integer,
  height       integer,
  size_bytes   integer,
  sort_order   integer not null default 0,
  uploaded_at  timestamptz not null default now()
);

create index if not exists photo_session_photos_session_idx
  on public.photo_session_photos(session_id, category, sort_order);

-- RLS: admin full CRUD; anon read-only by token (the upload endpoint uses
-- service-role for writes, so anon writes are blocked).
alter table public.photo_sessions enable row level security;
alter table public.photo_session_photos enable row level security;

create policy "photo_sessions_admin_all" on public.photo_sessions
  for all to authenticated using (true) with check (true);
create policy "photo_sessions_public_read" on public.photo_sessions
  for select to anon using (true);

create policy "photo_session_photos_admin_all" on public.photo_session_photos
  for all to authenticated using (true) with check (true);
create policy "photo_session_photos_public_read" on public.photo_session_photos
  for select to anon using (true);

-- ─── Supabase Storage bucket setup ────────────────────────────────────────────
-- After running this migration, create the storage bucket via the Supabase
-- dashboard:
--   1. Storage → New bucket
--   2. Name: "job-photos"
--   3. Public: OFF (server-side signed URLs only)
--   4. File size limit: 10MB
--   5. Allowed MIME types: image/jpeg, image/png, image/webp
