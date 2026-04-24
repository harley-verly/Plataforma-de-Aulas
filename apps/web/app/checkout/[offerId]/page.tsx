import { notFound } from "next/navigation";

import { SectionHeading } from "@plataforma/ui";

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
    <SiteShell
      title="Checkout sandbox-first"
      subtitle="Uma prova comercial funcional para demonstrar criacao de sessao, atribuicao de afiliado e encaminhamento para a area do aluno."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="pagamento"
          title="Sessao comercial pronta para a demonstracao"
          description="Este fluxo usa a API real do staging em modo sandbox-first, preservando a preparacao de split e observabilidade para o painel admin."
        />
        <CheckoutDemoPanel course={checkoutOffer.course} offer={checkoutOffer.offer} />
      </section>
    </SiteShell>
  );
}
