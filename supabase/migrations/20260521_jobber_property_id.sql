-- Add Jobber property ID to booking rows so we can link the Request to
-- the Property that was created with the Client. Without this, Requests
-- in Jobber show "No property associated" even though the address is
-- saved on the Client.

alter table public.bookings
  add column if not exists jobber_property_id text;
