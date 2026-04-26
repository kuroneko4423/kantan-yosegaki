create extension if not exists "pgcrypto";

create table public.boards (
  id text primary key,
  admin_token text not null unique,
  title text not null check (char_length(title) between 1 and 100),
  recipient_name text not null check (char_length(recipient_name) between 1 and 50),
  deadline date not null,
  host_name text not null check (char_length(host_name) between 1 and 50),
  template text not null default 'simple',
  is_locked boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index boards_admin_token_idx on public.boards (admin_token);
create index boards_expires_at_idx on public.boards (expires_at);

alter table public.boards enable row level security;
