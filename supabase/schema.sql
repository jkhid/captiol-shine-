-- Capitol Shine — Bookings Table
-- Run this in your Supabase dashboard → SQL Editor

create table if not exists bookings (
  id            uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email         text not null,
  phone         text not null,
  address       text not null,
  neighborhood  text,
  service       text not null,
  service_label text not null,
  home_type     text,
  bedrooms      integer,
  bathrooms     text,
  sqft          text,
  frequency     text,
  date          text not null,
  time_window   text,
  add_ons       text[] default '{}',
  price         integer not null,
  status        text not null default 'pending',
  notes         text,
  hear_about    text,
  referral_code text,
  created_at    timestamptz default now()
);

-- Optional: index for fast date queries
create index if not exists bookings_date_idx on bookings (date);
create index if not exists bookings_status_idx on bookings (status);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Enable RLS so the anon key cannot read or update bookings
alter table bookings enable row level security;

-- Allow anonymous inserts only (public booking form)
create policy "anon_insert" on bookings
  for insert
  to anon
  with check (true);

-- No anon SELECT, UPDATE, or DELETE — admin API uses service role key which bypasses RLS

-- ── Quote Requests Table ──────────────────────────────────────────────────────
-- For commercial & construction inquiries (no instant pricing)

create table if not exists quotes (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text not null,
  service_type text not null,  -- 'commercial' | 'construction'
  space_type   text,           -- e.g. 'office', 'retail', 'medical', 'new_build', 'renovation'
  sqft         text,
  timeline     text,
  notes        text,
  status       text not null default 'new',
  created_at   timestamptz default now()
);

alter table quotes enable row level security;

-- Allow anonymous inserts (public quote request form)
create policy "anon_insert_quotes" on quotes
  for insert
  to anon
  with check (true);
