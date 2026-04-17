-- Add frequency preference to clients (one-time vs recurring cadence)
alter table public.clients
  add column if not exists frequency text
    check (frequency in ('one_time','weekly','biweekly','monthly'));

create index if not exists clients_frequency_idx on public.clients(frequency);
