alter table pedidos add column if not exists carta text;
alter table pedidos add column if not exists linha_do_tempo text;
alter table pedidos add column if not exists promessas text;

alter table paginas add column if not exists carta text;
alter table paginas add column if not exists linha_do_tempo text;
alter table paginas add column if not exists promessas text;
