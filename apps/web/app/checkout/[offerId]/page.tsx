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
      <section className="marketing-page-hero marketing-page-hero-narrow">
        <span className="marketing-kicker">checkout</span>
        <h1>
          Sessao comercial pronta para
          <span> demonstracao</span>
        </h1>
        <p>
          Fluxo externo da plataforma com criacao de sessao, atribuicao opcional de afiliado e encaminhamento para a
          area interna do aluno.
        </p>
      </section>

      <section className="marketing-checkout-section">
        <CheckoutDemoPanel course={checkoutOffer.course} offer={checkoutOffer.offer} />
      </section>
    </SiteShell>
  );
}
