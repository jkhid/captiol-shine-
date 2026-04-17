-- Lead capture (offer-for-later modal on /lp)
create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  phone             text,
  source            text,                 -- e.g. "lp", "homepage"
  consent_marketing boolean not null default false,
  promo_code        text not null default 'FIRST30',
  redeemed_at       timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads(lower(email));
create index if not exists leads_phone_idx on public.leads(phone);
create index if not exists leads_created_at_idx on public.leads(created_at desc);

alter table public.leads enable row level security;
drop policy if exists leads_auth_all on public.leads;
create policy leads_auth_all on public.leads
  for all to authenticated using (true) with check (true);
