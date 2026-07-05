import { cookies } from "next/headers";
import { supabase, type Pedido } from "@/lib/supabase";
import { entrarNoPainel, sairDoPainel } from "./actions";

async function estaLogado(): Promise<boolean> {
  const cookieStore = await cookies();
  const senha = cookieStore.get("painel_senha")?.value;
  return Boolean(senha) && senha === process.env.ADMIN_PASSWORD;
}

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const logado = await estaLogado();

  if (!logado) {
    return (
      <main className="flex-1 flex items-center justify-center px-6">
        <form
          action={entrarNoPainel}
          className="max-w-sm w-full space-y-4 rounded-2xl border border-[color:var(--line)] bg-night-2 p-8"
        >
          <h1 className="text-2xl font-semibold">Painel</h1>
          <div>
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" required />
          </div>
          {erro && (
            <p className="text-sm text-red-300">Senha incorreta. Tenta de novo.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-gold text-night font-semibold py-3 hover:bg-gold-soft transition-colors"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .order("criado_em", { ascending: false });

  return (
    <main className="flex-1 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Pedidos</h1>
          <form action={sairDoPainel}>
            <button className="text-sm text-[color:var(--muted)] hover:text-star">
              Sair
            </button>
          </form>
        </div>

        {(!pedidos || pedidos.length === 0) && (
          <p className="text-[color:var(--muted)]">
            Nenhum pedido ainda. Quando alguém montar uma página em /criar,
            ela aparece aqui.
          </p>
        )}

        <div className="space-y-3">
          {(pedidos as Pedido[] | null)?.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[color:var(--line)] bg-night-2 p-5 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-star">
                  {p.nome_casal}{" "}
                  <span className="font-mono text-gold-soft text-sm">
                    #{p.codigo}
                  </span>
                </p>
                <p className="text-xs text-[color:var(--muted)] mt-1">
                  {new Date(p.criado_em).toLocaleString("pt-BR")} · status:{" "}
                  {p.status} · {p.fotos.length} foto(s)
                </p>
              </div>
              <a
                href={`/preview/${p.id}`}
                target="_blank"
                className="text-sm rounded-full border border-[color:var(--line)] px-4 py-2 hover:border-gold-soft hover:text-gold-soft transition-colors"
              >
                Ver prévia
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[color:var(--muted)]">
          Pra publicar a versão final (sem marca d&apos;água), depois de
          confirmar o pagamento, copie os dados desse pedido pra tabela{" "}
          <code>paginas</code> no Supabase (Table Editor) definindo um{" "}
          <code>slug</code> único. Isso ainda pode ser automatizado num
          próximo passo.
        </p>
      </div>
    </main>
  );
}
