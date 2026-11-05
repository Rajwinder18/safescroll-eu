-- Safe Scroll initial schema (run when Supabase credentials are available)
-- Do not place service-role keys in frontend env files.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'member' check (role in ('member', 'admin', 'parent', 'educator')),
  country_code text not null default 'FR',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  title text not null,
  status text not null check (status in (
    'active', 'proposed', 'initiative',
    'in_force', 'adopted_not_applicable', 'guidance', 'pilot'
  )),
  summary text not null,
  source_url text not null,
  last_reviewed date,
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  options jsonb not null,
  correct_index integer not null check (correct_index >= 0),
  explanation text not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  score integer not null,
  percent integer not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  checklist jsonb not null default '{}'::jsonb,
  challenge_progress jsonb not null default '{}'::jsonb,
  quiz_score integer,
  wellbeing_score integer,
  updated_at timestamptz not null default now()
);

create table if not exists public.wellbeing_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  social_daily numeric not null,
  total_daily numeric not null,
  sleep numeric not null,
  exercise numeric not null,
  break_minutes numeric default 0,
  score integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mindful_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_type text not null,
  duration_seconds integer not null default 0,
  reflection jsonb not null default '{}'::jsonb,
  action text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  consent_granted boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.family_groups(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  member_role text not null check (member_role in ('parent', 'child', 'teen')),
  age_band text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references auth.users(id) on delete set null,
  action text not null,
  target text not null,
  created_at timestamptz not null default now()
);

create index if not exists policies_country_idx on public.policies (country_code);
create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id, completed_at desc);
create index if not exists wellbeing_entries_user_idx on public.wellbeing_entries (user_id, created_at desc);
create index if not exists mindful_sessions_user_idx on public.mindful_sessions (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.policies enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.user_progress enable row level security;
alter table public.wellbeing_entries enable row level security;
alter table public.mindful_sessions enable row level security;
alter table public.family_groups enable row level security;
alter table public.family_members enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create policy "Users read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Public read policies"
  on public.policies for select using (true);

create policy "Admins manage policies"
  on public.policies for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read active quiz questions"
  on public.quiz_questions for select using (active = true or public.is_admin());

create policy "Admins manage quiz questions"
  on public.quiz_questions for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Users manage own quiz attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own wellbeing entries"
  on public.wellbeing_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own mindful sessions"
  on public.mindful_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users read families they created"
  on public.family_groups for select
  using (created_by = auth.uid() or public.is_admin());

create policy "Users manage families they created"
  on public.family_groups for all
  using (created_by = auth.uid() or public.is_admin())
  with check (created_by = auth.uid() or public.is_admin());

create policy "Family members readable by creator"
  on public.family_members for select
  using (
    exists (
      select 1 from public.family_groups g
      where g.id = family_id and (g.created_by = auth.uid() or public.is_admin())
    )
  );

create policy "Admins read audit logs"
  on public.audit_logs for select using (public.is_admin());

create policy "Admins insert audit logs"
  on public.audit_logs for insert with check (public.is_admin());
