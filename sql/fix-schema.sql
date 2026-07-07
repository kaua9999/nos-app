-- CORREÇÃO: apaga as tabelas com nomes de coluna errados e recria certinho
drop table if exists paginas;
drop table if exists pedidos;

create extension if not exists "pgcrypto";

create table pedidos (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nome_casal text not null,
  data_especial date,
  cidade text,
  tema text not null default 'ceu-estrelado',
  mensagem text,
  musica_url text,
  fotos jsonb default '[]'::jsonb,
  status text not null default 'rascunho',
  criado_em timestamptz not null default now()
);

create index idx_pedidos_codigo on pedidos (codigo);
create index idx_pedidos_status on pedidos (status);

create table paginas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
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

create index idx_paginas_slug on paginas (slug);

alter table pedidos enable row level security;
alter table paginas enable row level security;

create policy "qualquer um pode criar pedido"
  on pedidos for insert to anon with check (true);

create policy "qualquer um pode ler pedido pelo id"
  on pedidos for select to anon using (true);

create policy "paginas publicadas sao publicas"
  on paginas for select to anon using (ativa = true);
