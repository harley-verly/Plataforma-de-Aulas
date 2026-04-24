import { notFound } from "next/navigation";

import { CheckoutDemoPanel } from "../../../components/checkout-demo-panel";
import { SiteShell } from "../../../components/site-shell";
import { getCheckoutOffer } from "../../../lib/platform-api";

export default async function CheckoutPage({
  params
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = await params;
  const checkoutOffer = await getCheckoutOffer(offerId);

  if (!checkoutOffer) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="hero hero-compact">
        <div className="hero-copy">
          <span className="eyebrow">checkout</span>
          <h1>Sessao comercial pronta para a demonstracao.</h1>
          <p className="hero-text">
            Fluxo externo da plataforma com criacao de sessao, atribuicao opcional de afiliado e encaminhamento para a
            area interna do aluno.
          </p>
        </div>

        <aside className="hero-panel">
          <div className="stack-panel compact-stack-panel">
            <span className="eyebrow">modo atual</span>
            <h3>Sandbox-first</h3>
            <p>Preparado para Asaas, split e observabilidade sem expor a operacao para o cliente.</p>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <CheckoutDemoPanel course={checkoutOffer.course} offer={checkoutOffer.offer} />
      </section>
    </SiteShell>
  );
}
