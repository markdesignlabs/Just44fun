-- ==============================================================================
-- Just44FunX - Supabase Waitlist Table Setup
-- Run this SQL snippet in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create Waitlist Table
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  handle text not null unique,
  email text not null,
  category text default 'General',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.waitlist enable row level security;

-- 3. Policy: Allow anonymous users to submit registrations (INSERT only)
drop policy if exists "Allow anonymous waitlist submission" on public.waitlist;
create policy "Allow anonymous waitlist submission" on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- 4. Policy: Allow service role / dashboard admin full read access (SELECT)
drop policy if exists "Allow admin read access" on public.waitlist;
create policy "Allow admin read access" on public.waitlist
  for select
  to service_role, authenticated
  using (true);

-- 5. Optional Index for quick handle searches
create index if not exists idx_waitlist_handle on public.waitlist (lower(handle));
create index if not exists idx_waitlist_email on public.waitlist (lower(email));
