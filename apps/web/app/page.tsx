import Link from "next/link";

import { demoAdminQueue, demoCourses } from "@plataforma/contracts";

import { CourseCard } from "../components/course-card";
import { SiteShell } from "../components/site-shell";
import { getHomeData } from "../lib/platform-api";

export default async function HomePage() {
  const home = await getHomeData();

  return (
    <SiteShell>
      <section className="marketing-hero">
        <div className="marketing-hero-emblem">
          <span className="member-brand-dot" />
        </div>
        <span className="marketing-kicker">plataforma proprietaria de cursos</span>
        <h1 className="marketing-hero-title">
          Sua operacao de cursos com
          <span> experiencia premium</span>
        </h1>
        <p className="marketing-hero-copy">
          Catalogo, checkout, area do aluno, afiliacao e governanca em uma fachada comercial com o mesmo desenho visual
          da landing do Portal de Leads.
        </p>
        <div className="marketing-hero-actions">
          <Link href="/login?mode=register" className="primary-action workspace-link">
            Criar conta
          </Link>
          <Link href="/login" className="secondary-action workspace-link">
            Acessar plataforma
          </Link>
        </div>
        <div className="marketing-benefit-row">
          <div className="marketing-benefit-item">
            <span className="marketing-benefit-dot" />
            <span>catalogo premium</span>
          </div>
          <div className="marketing-benefit-item">
            <span className="marketing-benefit-dot" />
            <span>checkout pronto para demonstracao</span>
          </div>
          <div className="marketing-benefit-item">
            <span className="marketing-benefit-dot" />
            <span>area interna com cara de plataforma real</span>
          </div>
        </div>
      </section>

      <section className="marketing-panel-grid" id="funcionalidades">
        <article className="marketing-panel-card marketing-panel-card-wide">
          <span className="eyebrow">estrutura externa</span>
          <h2>Descoberta, oferta e entrada comercial no mesmo idioma visual do portal.</h2>
          <p>
            A frente publica agora foi organizada como landing de produto: headline central, CTA direto, leitura limpa
            e transicao natural para catalogo, oferta e login.
          </p>
          <div className="marketing-inline-actions">
            <Link href="/catalog" className="button-link">
              Ver catalogo
            </Link>
            <Link href="/#planos" className="ghost-link">
              Ver estrutura
            </Link>
          </div>
        </article>

        <article className="marketing-panel-card">
          <span className="eyebrow">camadas prontas</span>
          <ul className="marketing-stat-list">
            {home.metrics.map((metric) => (
              <li key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.note}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="marketing-band-grid" id="produtores">
        <article className="marketing-band-card">
          <span className="eyebrow">produtores e operacao</span>
          <h3>Entrada interna com governanca, sem expor papeis sensiveis na tela publica.</h3>
          <p>
            Cadastro publico nasce como conta comum. Solicitacoes de produtor e afiliado acontecem somente depois do
            login, dentro da propria plataforma.
          </p>
        </article>

        <article className="marketing-band-card">
          <span className="eyebrow">fila atual</span>
          <div className="marketing-queue-list">
            {demoAdminQueue.slice(0, 3).map((item) => (
              <div className="marketing-queue-item" key={item.id}>
                <strong>{item.displayName}</strong>
                <span>{item.kind === "producer" ? "produtor" : "afiliado"}</span>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="marketing-course-section">
        <div className="marketing-section-heading">
          <span className="eyebrow">catalogo em destaque</span>
          <h2>Ofertas e trilhas prontas para apresentar a plataforma ao cliente.</h2>
          <p>
            Os cards abaixo continuam comerciais na parte externa, mas ja puxam para a experiencia interna de consumo,
            progresso e acompanhamento.
          </p>
        </div>
        <div className="card-grid">
          {demoCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="marketing-plan-strip" id="planos">
        <div className="marketing-plan-card">
          <span className="eyebrow">checkout</span>
          <strong>compra avulsa e recorrencia</strong>
          <p>Fluxo sandbox-first pronto para demonstracao, com trilha de afiliado e liberacao do aluno.</p>
        </div>
        <div className="marketing-plan-card">
          <span className="eyebrow">learning</span>
          <strong>player, modulos e progresso</strong>
          <p>Area interna inspirada na sua plataforma WordPress, com visual escuro, video e biblioteca lateral.</p>
        </div>
        <div className="marketing-plan-card">
          <span className="eyebrow">operacao</span>
          <strong>studio, afiliacao e admin</strong>
          <p>Superficies internas com fila de aprovacao, links, rascunhos e governanca do ambiente.</p>
        </div>
      </section>

      <section className="marketing-faq-grid" id="faq">
        <article className="marketing-faq-card">
          <strong>Como o acesso funciona?</strong>
          <p>Login unico. Cadastro publico cria conta de aluno. Permissoes internas sao liberadas depois.</p>
        </article>
        <article className="marketing-faq-card">
          <strong>Onde a compra acontece?</strong>
          <p>No checkout da propria plataforma, dentro da mesma identidade visual e com fluxo pronto para staging.</p>
        </article>
        <article className="marketing-faq-card">
          <strong>O cliente ja enxerga uma plataforma completa?</strong>
          <p>Sim. Parte externa de venda e parte interna de consumo operam como um unico produto proprietario.</p>
        </article>
      </section>
    </SiteShell>
  );
}
