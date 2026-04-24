import Link from "next/link";

import { demoAdminQueue, demoCourses, demoHomeMetrics, demoTestimonials } from "@plataforma/contracts";
import { DataStrip } from "@plataforma/ui";

import { CourseCard } from "../components/course-card";
import { SiteShell } from "../components/site-shell";

export default function HomePage() {
  const featuredCourse = demoCourses[0];

  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">plataforma de aulas premium</span>
          <h1>Ambiente proprietario para vender, entregar e escalar cursos com presenca de marca.</h1>
          <p className="hero-text">
            A frente comercial segue o mesmo padrao visual da landing do Portal de Leads: composicao forte, hierarquia
            clara e blocos que sustentam o valor do produto antes do login.
          </p>
          <div className="hero-actions">
            <Link href="/login" className="primary-action workspace-link">
              Entrar na plataforma
            </Link>
            <Link href="/catalog" className="secondary-action workspace-link">
              Explorar catalogo
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="brand-tile product-brand-tile">
            <div className="brand-visual">
              <div className="member-brand-emblem">
                <span className="member-brand-dot" />
              </div>
            </div>
            <div>
              <p className="muted-label">produto em destaque</p>
              <strong>{featuredCourse?.title ?? "Plataforma de Aulas"}</strong>
              <p className="brand-caption">{featuredCourse?.subtitle}</p>
            </div>
          </div>

          <div className="hero-stats hero-stats-compact">
            {demoHomeMetrics.map((metric) => (
              <article className="stat-card" key={metric.label}>
                <span className="muted-label">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="content-grid" id="estrutura">
        <div className="content-column">
          <div className="section-heading">
            <span className="eyebrow">estrutura principal</span>
            <h2>Uma fachada comercial elegante na frente e uma operacao real por tras.</h2>
            <p className="section-copy">
              A plataforma foi organizada para apresentar valor na descoberta, fechar venda no checkout e sustentar o
              consumo do aluno dentro de uma area de membros consistente.
            </p>
          </div>

          <div className="module-grid">
            <article className="panel-card">
              <div className="card-topline">
                <strong>Catalogo premium</strong>
                <span>publico</span>
              </div>
              <p>Vitrine comercial com cursos, provas de valor e caminhos naturais para oferta e checkout.</p>
            </article>
            <article className="panel-card">
              <div className="card-topline">
                <strong>Checkout sandbox-first</strong>
                <span>publico</span>
              </div>
              <p>Fluxo funcional para demonstrar compra, atribuicao de afiliado e liberacao do aluno.</p>
            </article>
            <article className="panel-card">
              <div className="card-topline">
                <strong>Area de membros</strong>
                <span>interna</span>
              </div>
              <p>Biblioteca, progresso, video e pedidos internos num ambiente coerente com plataforma de cursos real.</p>
            </article>
            <article className="panel-card">
              <div className="card-topline">
                <strong>Governanca operacional</strong>
                <span>interna</span>
              </div>
              <p>Entradas de produtor e afiliado, fila administrativa e leitura de saude do ambiente.</p>
            </article>
          </div>
        </div>

        <div className="sidebar-column">
          <div className="stack-panel">
            <div className="panel-headline">
              <span className="eyebrow">superficies oficiais</span>
              <h3>Camadas do produto</h3>
            </div>
            <div className="domain-list">
              <div className="domain-row">
                <strong>Area publica</strong>
                <code>aulas.abasolucoesetecnologia.com.br</code>
                <p>Landing, catalogo, oferta e fluxo de entrada da plataforma.</p>
              </div>
              <div className="domain-row">
                <strong>Area do aluno</strong>
                <code>/learning</code>
                <p>Biblioteca, retomada, progresso e solicitacoes internas de afiliado ou produtor.</p>
              </div>
              <div className="domain-row">
                <strong>Operacao interna</strong>
                <code>/studio /affiliate /admin</code>
                <p>Ambientes liberados somente apos validacao de perfil e permissao correspondente.</p>
              </div>
            </div>
          </div>

          <div className="stack-panel">
            <div className="panel-headline">
              <span className="eyebrow">governanca</span>
              <h3>Regras do acesso</h3>
            </div>
            <ul className="rule-list">
              <li>o cadastro publico cria conta comum de aluno</li>
              <li>afiliacao e publicacao de cursos sao solicitadas por dentro da area logada</li>
              <li>perfis administrativos nao sao escolhidos na tela de login</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="three-up-grid" id="experiencia">
        <article className="panel-card accent-card">
          <strong>Experiencia comercial</strong>
          <p>Hero, vitrine e pilhas de conteudo com a mesma disciplina visual da landing do Portal de Leads.</p>
        </article>
        <article className="panel-card accent-card">
          <strong>Experiencia de aluno</strong>
          <p>Area interna inspirada na sua referencia WordPress, com banner forte, modulos e video em destaque.</p>
        </article>
        <article className="panel-card accent-card">
          <strong>Experiencia de operacao</strong>
          <p>Pedidos internos, aprovacoes e consoles restritos sem expor papeis sensiveis na parte publica.</p>
        </article>
      </section>

      <DataStrip items={demoHomeMetrics} />

      <section className="content-grid lower-grid">
        <div className="content-column">
          <div className="section-heading">
            <span className="eyebrow">cursos em destaque</span>
            <h2>Ofertas preparadas para demonstrar valor, compra e entrega.</h2>
          </div>
          <div className="card-grid">
            {demoCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <aside className="sidebar-column">
          <div className="stack-panel tall">
            <span className="eyebrow">aprovacoes em fila</span>
            <h3>Entrada de parceiros com controle</h3>
            <div className="story-list compact-story-list">
              {demoAdminQueue.map((item) => (
                <div className="story-list-item" key={item.id}>
                  <span>{item.kind === "producer" ? "produtor" : "afiliado"}</span>
                  <strong>{item.displayName}</strong>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="three-up-grid">
        {demoTestimonials.map((testimonial) => (
          <article className="panel-card" key={testimonial.name}>
            <strong>{testimonial.name}</strong>
            <p>{testimonial.quote}</p>
            <span className="muted-label">{testimonial.role}</span>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
