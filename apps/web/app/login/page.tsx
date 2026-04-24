import { routeByRole } from "@plataforma/config";
import { Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";

const roleCards = Object.entries(routeByRole);

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
        <div className="feature-grid">
          {roleCards.map(([role, route]) => (
            <SurfaceCard key={role}>
              <Pill>{role}</Pill>
              <h3>{route}</h3>
              <p>Rota de aterrissagem prevista para o papel `{role}`.</p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
