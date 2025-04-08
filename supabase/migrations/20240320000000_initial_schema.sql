-- Abilita l'estensione uuid-ossp se non già abilitata
create extension if not exists "uuid-ossp";

-- Utenti
create table if not exists users (
  id uuid primary key references auth.users(id),
  email text not null,
  credits integer default 0,
  last_login timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Feedback
create table if not exists feedback (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  email text not null,
  rating integer check (rating >= 1 and rating <= 5),
  feedback text,
  created_at timestamp default now()
);

-- Storico utilizzi
create table if not exists usage (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  tool text not null,
  input text,
  output text,
  credits_used integer default 1,
  used_at timestamp default now()
);

-- Trigger per aggiornare updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();

-- Funzione per creare un utente quando si registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger per creare l'utente alla registrazione
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Policy per la sicurezza
alter table users enable row level security;
alter table feedback enable row level security;
alter table usage enable row level security;

-- Policy per users
create policy "Users can view own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on users for update
  using (auth.uid() = id);

-- Policy per feedback
create policy "Users can insert own feedback"
  on feedback for insert
  with check (auth.uid() = user_id);

create policy "Users can view own feedback"
  on feedback for select
  using (auth.uid() = user_id);

-- Policy per usage
create policy "Users can insert own usage"
  on usage for insert
  with check (auth.uid() = user_id);

create policy "Users can view own usage"
  on usage for select
  using (auth.uid() = user_id); 