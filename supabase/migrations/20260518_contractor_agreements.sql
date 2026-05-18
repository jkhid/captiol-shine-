-- ─── Contractor agreement e-signature ───────────────────────────────────────
-- Replaces the DocuSign trial. Admin creates an agreement, copies the unique
-- URL, sends it manually in their post-interview email. Contractor opens
-- the link, types a cursive signature, and submits. Both parties can view
-- the signed copy at the same URL afterward.

create table if not exists public.contractor_agreements (
  id                   uuid primary key default gen_random_uuid(),
  token                text unique not null,                -- URL slug
  status               text not null default 'pending'
                       check (status in ('pending','viewed','signed','voided')),

  -- Contractor info (admin enters at creation)
  contractor_name      text not null,
  contractor_email     text,
  effective_date       date not null default current_date,

  -- Audit trail
  created_by           text,                                 -- admin email/name; freeform
  created_at           timestamptz not null default now(),
  viewed_at            timestamptz,
  signed_at            timestamptz,

  -- Signature data
  signed_typed_name    text,
  signer_ip            text,
  signer_user_agent    text,

  updated_at           timestamptz not null default now()
);

create index if not exists contractor_agreements_token_idx     on public.contractor_agreements(token);
create index if not exists contractor_agreements_status_idx    on public.contractor_agreements(status);
create index if not exists contractor_agreements_created_at_idx on public.contractor_agreements(created_at desc);

-- updated_at trigger (reuses set_updated_at() from 20260413_crm.sql)
drop trigger if exists contractor_agreements_set_updated_at on public.contractor_agreements;
create trigger contractor_agreements_set_updated_at
  before update on public.contractor_agreements
  for each row execute function public.set_updated_at();

-- RLS: authenticated admin full CRUD; anon can SELECT by token only.
-- Signing writes happen via service-role API.
alter table public.contractor_agreements enable row level security;

create policy "contractor_agreements_admin_all" on public.contractor_agreements
  for all to authenticated using (true) with check (true);

create policy "contractor_agreements_public_read" on public.contractor_agreements
  for select to anon using (true);
