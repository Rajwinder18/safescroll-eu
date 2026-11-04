create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'member' check (role in ('member', 'admin')),
  country_code text not null default 'FR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  title text not null,
  status text not null check (status in ('active', 'proposed', 'initiative')),
  summary text not null,
  source_url text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  checklist jsonb not null default '{}'::jsonb,
  quiz_score integer,
  wellbeing_score integer,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.policies enable row level security;
alter table public.user_progress enable row level security;

create policy "Public can read policies"
  on public.policies for select
  using (true);

create policy "Users read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update their own progress"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins manage policies"
  on public.policies for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

alter publication supabase_realtime add table public.policies;
alter publication supabase_realtime add table public.user_progress;
