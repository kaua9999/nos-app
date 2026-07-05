# Nós — editor + prévia + painel

Projeto em Next.js + Supabase. Sem pagamento automático: a pessoa monta a
página, vê uma prévia com marca d'água, e manda um código pelo Direct do
Instagram pra você seguir com o pagamento manual e liberar a versão final.

## 1. Rodar o banco de dados (uma vez só)

1. Entre no seu projeto em supabase.com
2. Vá em **SQL Editor** → **New query**
3. Cole todo o conteúdo do arquivo `supabase/schema.sql`
4. Clique em **Run**

Isso cria duas tabelas: `pedidos` (rascunhos do site) e `paginas` (o
presente final, já publicado).

## 2. Configurar as variáveis de ambiente

1. Copie `.env.local.example` pra um arquivo novo chamado `.env.local`
2. Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — pegue em
     Project Settings → API Keys no Supabase
   - `NEXT_PUBLIC_INSTAGRAM_USER` — seu usuário do Instagram, sem @
   - `ADMIN_PASSWORD` — uma senha só sua pra entrar em `/painel`

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## 4. Como o fluxo funciona

- `/` — vitrine, leva pra `/criar`
- `/criar` — formulário. Ao enviar, grava um "pedido" no Supabase com status
  `rascunho` e te leva pra `/preview/[id]`
- `/preview/[id]` — mostra a prévia com marca d'água "AMOSTRA · NÃO
  PUBLICADO" e o código curto (ex: `A312`) pra pessoa mandar no Direct
- `/painel` — protegido por senha (a `ADMIN_PASSWORD`). Lista todos os
  pedidos recebidos, do mais recente pro mais antigo
- `/p/[slug]` — a página final, publicada, sem marca d'água (ainda precisa
  ser criada manualmente na tabela `paginas` depois que você confirmar o
  pagamento — ver próximo passo)

## 5. Publicar a versão final (por enquanto, manual)

Depois que a pessoa paga:

1. Vá no Supabase → **Table Editor** → tabela `paginas`
2. Clique em **Insert row**
3. Copie os dados do pedido correspondente (você vê tudo em `/painel`) e
   escolha um `slug` único, tipo `ana-e-pedro` — esse vira a URL final:
   `seusite.com/p/ana-e-pedro`
4. Envie esse link pra pessoa

Isso pode ser automatizado depois com um botão "Publicar" direto no painel
— é o próximo passo natural quando o fluxo manual começar a pesar.

## 6. Subir pro ar (Vercel, de graça)

1. Suba esse projeto pro GitHub
2. Entre em vercel.com → **Add New Project** → importe o repositório
3. Em **Environment Variables**, adicione as mesmas 4 variáveis do
   `.env.local`
4. Deploy

## Limitações conhecidas dessa primeira versão

- As fotos são links que a pessoa cola (Google Fotos, Imgur, Drive) — ainda
  não tem upload direto de arquivo no formulário. Dá pra evoluir isso
  depois usando o Supabase Storage.
- Publicar a página final ainda é manual (passo 5). Automatizar isso é o
  próximo passo mais valioso.
- O painel usa uma senha simples guardada num cookie — funciona bem pra
  você sozinho operando o negócio, mas não é um sistema de login robusto
  pra múltiplos usuários.
