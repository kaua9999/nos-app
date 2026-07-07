import { TEMAS } from "@/lib/supabase";
import { criarPedido } from "./actions";

export default function CriarPage() {
  return (
    <main className="flex-1 px-6 py-16">
      <form action={criarPedido} className="max-w-xl mx-auto space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-soft font-mono">
            ✦ monte a sua página
          </span>
          <h1 className="mt-3 text-3xl font-semibold">
            Conte a história de vocês
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Nada aqui é cobrado ainda. No final você vê uma prévia com marca
            d&apos;água antes de decidir qualquer coisa.
          </p>
        </div>

        <div>
          <label htmlFor="nome_casal">Nome do casal (ex: Ana &amp; Pedro) *</label>
          <input
            id="nome_casal"
            name="nome_casal"
            required
            maxLength={80}
            placeholder="Ana & Pedro"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="data_especial">Data especial</label>
            <input id="data_especial" name="data_especial" type="date" />
          </div>
          <div>
            <label htmlFor="cidade">Cidade daquele dia</label>
            <input
              id="cidade"
              name="cidade"
              placeholder="Ex: Recife, PE"
              maxLength={60}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tema">Tema</label>
          <select id="tema" name="tema" defaultValue={TEMAS[0].id}>
            {TEMAS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="mensagem">
            Frase curta (aparece embaixo do nome, até 200 caracteres)
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={2}
            maxLength={200}
            placeholder='Ex: "eu amo você eternamente"'
          />
        </div>

        <div>
          <label htmlFor="carta">
            Carta de amor (texto completo, some por trás de um botão &quot;abrir
            carta&quot;)
          </label>
          <textarea
            id="carta"
            name="carta"
            rows={8}
            maxLength={3000}
            placeholder="Escreva a carta inteira aqui..."
          />
        </div>

        <div>
          <label htmlFor="linha_do_tempo">
            Linha do tempo — um marco por linha, no formato: data | título |
            descrição
          </label>
          <textarea
            id="linha_do_tempo"
            name="linha_do_tempo"
            rows={5}
            placeholder={
              "12/03/2023 | Primeiro encontro | Aquele café que durou 4 horas\n01/06/2024 | Pedido de namoro | No topo da montanha"
            }
          />
        </div>

        <div>
          <label htmlFor="promessas">
            Promessas — uma por linha, no formato: título | descrição
            (opcional)
          </label>
          <textarea
            id="promessas"
            name="promessas"
            rows={4}
            placeholder={
              "Amor Eterno | Prometo te amar hoje, amanhã e para sempre\nConstruir um Lar | Um lugar cheio de amor, risadas e memórias"
            }
          />
        </div>

        <div>
          <label htmlFor="musica_url">
            Link da música (YouTube ou Spotify) — toca dentro da página
          </label>
          <input
            id="musica_url"
            name="musica_url"
            type="url"
            placeholder="https://open.spotify.com/track/... ou https://youtube.com/watch?v=..."
          />
        </div>

        <div>
          <label htmlFor="fotos">
            Fotos — escolha até 12 fotos do seu celular ou computador
          </label>
          <input
            id="fotos"
            name="fotos"
            type="file"
            accept="image/*"
            multiple
            required
          />
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Formatos aceitos: JPG, PNG ou WEBP. Cada foto até 5MB.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-gold text-night font-semibold py-4 hover:bg-gold-soft transition-colors"
        >
          Ver minha prévia →
        </button>
      </form>
    </main>
  );
}
