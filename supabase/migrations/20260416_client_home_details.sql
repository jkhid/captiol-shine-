-- Add home details to clients
alter table public.clients
  add column if not exists home_type text,
  add column if not exists bedrooms int,
  add column if not exists bathrooms text;
