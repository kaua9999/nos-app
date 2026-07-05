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
            Mensagem / carta (até 600 caracteres)
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={6}
            maxLength={600}
            placeholder="Escreva o que você quer dizer pra essa pessoa..."
          />
        </div>

        <div>
          <label htmlFor="musica_url">Link da música (Spotify ou YouTube)</label>
          <input
            id="musica_url"
            name="musica_url"
            type="url"
            placeholder="https://open.spotify.com/track/..."
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
