-- Permite que qualquer visitante ENVIE fotos pro bucket "fotos"
create policy "qualquer um pode enviar fotos"
on storage.objects for insert
to anon
with check (bucket_id = 'fotos');

-- Permite que qualquer visitante LEIA as fotos do bucket "fotos"
create policy "qualquer um pode ler fotos"
on storage.objects for select
to anon
using (bucket_id = 'fotos');
