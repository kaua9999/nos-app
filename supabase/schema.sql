-- Rode esse arquivo no Supabase: Painel do projeto > SQL Editor > New query > cole tudo > Run

-- Extensão pra gerar códigos/ids aleatórios
create extension if not exists "pgcrypto";

-- =========================================================
-- TABELA 1: pedidos (rascunhos criados no site, antes de pagar)
-- =========================================================
create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,            -- código curto tipo "A312" que a pessoa manda no Direct
  nome_casal text not null,               -- ex: "Ana & Pedro"
  data_especial date,
  cidade text,                            -- usado pro mapa do céu
  tema text not null default 'ceu-estrelado', -- ceu-estrelado | polaroid | carta-antiga | neon
  mensagem text,                          -- carta/mensagem, até 600 caracteres
  musica_url text,                        -- link do Spotify/YouTube
  fotos jsonb default '[]'::jsonb,        -- lista de URLs das fotos no Supabase Storage
  status text not null default 'rascunho', -- rascunho | aguardando_pagamento | pago | publicado | cancelado
  criado_em timestamptz not null default now()
);

create index if not exists idx_pedidos_codigo on pedidos (codigo);
create index if not exists idx_pedidos_status on pedidos (status);

-- =========================================================
-- TABELA 2: paginas (o presente final, já publicado e pago)
-- Independente da tabela pedidos -- pode apagar o pedido depois
-- de publicar, que a página continua no ar.
-- =========================================================
create table if not exists paginas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,              -- vira a url: seusite.com/p/slug
  nome_casal text not null,
  data_especial date,
  cidade text,
  tema text not null default 'ceu-estrelado',
  mensagem text,
  musica_url text,
  fotos jsonb default '[]'::jsonb,
  ativa boolean not null default true,
  publicado_em timestamptz not null default now()
);

create index if not exists idx_paginas_slug on paginas (slug);

-- =========================================================
-- Segurança (RLS): qualquer visitante pode CRIAR um pedido
-- (é o formulário público), mas só leitura/edição controlada
-- fica liberada pra chave pública. Ajustamos com policies simples.
-- =========================================================
alter table pedidos enable row level security;
alter table paginas enable row level security;

-- Qualquer pessoa (chave anon/publishable) pode inserir um novo pedido
create policy "qualquer um pode criar pedido"
  on pedidos for insert
  to anon
  with check (true);

-- Qualquer pessoa pode ler um pedido específico (pra mostrar a prévia) -
-- na prática só quem tem o link/id do pedido consegue buscar ele
create policy "qualquer um pode ler pedido pelo id"
  on pedidos for select
  to anon
  using (true);

-- Páginas publicadas são públicas pra leitura (é o presente em si)
create policy "paginas publicadas sao publicas"
  on paginas for select
  to anon
  using (ativa = true);

-- OBS: updates/deletes de pedidos e inserts em paginas ficam de fora
-- do acesso público -- você vai fazer isso pelo painel usando login,
-- ou depois evoluímos pra uma service_role key num backend seguro.
