create table public.messages (
  id uuid primary key default gen_random_uuid(),
  board_id text not null references public.boards(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 50),
  content text not null check (char_length(content) between 1 and 200),
  card_color text not null default 'cream'
    check (card_color in ('cream','pink','mint','sky','lemon')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index messages_board_id_position_idx
  on public.messages (board_id, position asc, created_at asc);

alter table public.messages enable row level security;
