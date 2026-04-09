-- Run this in your Supabase SQL editor at supabase.com

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Safe Space Posts (anonymous)
create table public.posts (
  id bigserial primary key,
  category text not null,
  content text not null,
  replies int default 0,
  hearts int default 0,
  created_at timestamptz default now()
);
alter table public.posts enable row level security;
create policy "Anyone can read posts" on public.posts for select using (true);
create policy "Authenticated users can create posts" on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update hearts" on public.posts for update using (auth.role() = 'authenticated');

-- Messages
create table public.messages (
  id bigserial primary key,
  room_id text not null,
  sender_id uuid references auth.users(id),
  content text not null,
  type text default 'text',
  file_url text,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;
create policy "Users can read messages in their rooms" on public.messages for select using (auth.role() = 'authenticated');
create policy "Users can send messages" on public.messages for insert with check (auth.uid() = sender_id);

-- Enable realtime for messages
alter publication supabase_realtime add table public.messages;

-- Event Registrations
create table public.event_registrations (
  id bigserial primary key,
  event_id text not null,
  name text not null,
  email text not null,
  created_at timestamptz default now()
);
alter table public.event_registrations enable row level security;
create policy "Anyone can register for events" on public.event_registrations for insert with check (true);

-- Saved Jobs
create table public.saved_jobs (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  job_id int not null,
  job_data jsonb not null,
  created_at timestamptz default now(),
  unique(user_id, job_id)
);
alter table public.saved_jobs enable row level security;
create policy "Users can manage own saved jobs" on public.saved_jobs using (auth.uid() = user_id);

-- Storage bucket for chat files
insert into storage.buckets (id, name, public) values ('chat-files', 'chat-files', true);
create policy "Authenticated users can upload files" on storage.objects for insert with check (auth.role() = 'authenticated');
create policy "Anyone can view files" on storage.objects for select using (true);
