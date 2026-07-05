-- ===================================================
-- Schema do projeto "Nós" - presentes digitais
-- Rode isso no SQL Editor do Supabase
-- ===================================================

-- Extensão pra gerar UUID
create extension if not exists "pgcrypto";

-- Tabela de PEDIDOS (rascunhos criados no site, antes de pagar)
create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,            -- código curto tipo "A312" pro cliente mandar no Direct
  nomes text not null,
  data_especial date,
  tema text not null default 'estrelado', -- estrelado | polaroid | carta | neon
  mensagem text,
  musica_link text,
  fotos text[] default '{}',              -- urls das fotos no Storage
  status text not null default 'pendente',-- pendente | pago | cancelado
  created_at timestamptz default now()
);

-- Tabela de PÁGINAS publicadas (o presente final, já sem marca d'água)
create table if not exists paginas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,              -- parte final da url: nosapp.com/p/slug
  nomes text not null,
  data_especial date,
  tema text not null default 'estrelado',
  mensagem text,
  musica_link text,
  fotos text[] default '{}',
  pedido_id uuid references pedidos(id),
  published_at timestamptz default now()
);

-- Segurança (RLS) - versão simples para começar (MVP)
alter table pedidos enable row level security;
alter table paginas enable row level security;

-- Qualquer visitante pode CRIAR um pedido (é o formulário do site)
create policy "qualquer um pode criar pedido" on pedidos
  for insert with check (true);

-- Qualquer visitante pode LER um pedido específico (pra prévia com marca d'água)
create policy "qualquer um pode ler pedidos" on pedidos
  for select using (true);

-- Qualquer visitante pode LER páginas publicadas (é o presente final, público)
create policy "qualquer um pode ler paginas" on paginas
  for select using (true);

-- IMPORTANTE (leia isto):
-- Por enquanto, update/delete em pedidos e insert em paginas só serão feitos
-- pelo PAINEL usando a chave anon mesmo (MVP simples, sem login de verdade).
-- Isso é aceitável pra fase de testes, mas antes de crescer o negócio,
-- o ideal é adicionar autenticação (Supabase Auth) só para você acessar o painel,
-- restringindo essas ações a um usuário autenticado (admin), e não a qualquer pessoa.
create policy "permitir update de pedidos (MVP)" on pedidos
  for update using (true);
create policy "permitir delete de pedidos (MVP)" on pedidos
  for delete using (true);
create policy "permitir insert de paginas (MVP)" on paginas
  for insert with check (true);
