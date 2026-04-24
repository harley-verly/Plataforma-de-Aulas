import { Suspense } from "react";

import { SectionHeading } from "@plataforma/ui";

import { AuthPanel } from "../../components/auth-panel";
import { SiteShell } from "../../components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell
      title="Autenticacao e roteamento por papel"
      subtitle="A plataforma ja nasce com caminhos distintos para aluno, produtor, afiliado, suporte e administracao."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="roles"
          title="Entradas previstas nesta fundacao"
          description="O backend aceita cadastro e login em modo demonstracao para cada perfil principal da operacao."
        />
        <Suspense fallback={<div className="status-banner status-banner-success">Carregando autenticacao do staging...</div>}>
          <AuthPanel />
        </Suspense>
      </section>
    </SiteShell>
  );
}
