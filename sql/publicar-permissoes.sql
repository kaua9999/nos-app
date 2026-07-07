-- Coluna nova pra guardar o link publicado direto no pedido
alter table pedidos add column if not exists slug_publicado text;

-- Permite que o painel PUBLIQUE (insira) páginas finais
drop policy if exists "permitir insert de paginas" on paginas;
create policy "permitir insert de paginas"
  on paginas for insert to anon with check (true);

-- Permite que o painel ATUALIZE o status do pedido (marcar como publicado)
drop policy if exists "permitir update de pedidos" on pedidos;
create policy "permitir update de pedidos"
  on pedidos for update to anon using (true);

-- Permite que o painel APAGUE pedidos antigos
drop policy if exists "permitir delete de pedidos" on pedidos;
create policy "permitir delete de pedidos"
  on pedidos for delete to anon using (true);
