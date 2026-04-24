import Link from "next/link";

import { platformConfig } from "@plataforma/config";
import { demoAdminQueue, demoCourses, demoHomeMetrics, demoTestimonials } from "@plataforma/contracts";
import { ButtonLink, DataStrip, Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { CourseCard } from "../components/course-card";
import { SiteShell } from "../components/site-shell";

export default function HomePage() {
  const featuredCourse = demoCourses[0];

  return (
    <SiteShell
      eyebrow="plataforma premium"
      title="Uma plataforma de aulas que ja nasce com presenca de marca."
      subtitle="A prova comercial precisa parecer academia digital proprietaria, com contraste forte, narrativa clara e transicao natural entre descoberta, acesso, aprendizagem e operacao."
    >
      <section className="story-stage">
        <SurfaceCard className="story-stage-main">
          <p className="section-eyebrow">catalogo + checkout + learning</p>
          <h2>Mais proxima de uma academia premium do que de um software generico.</h2>
          <p>
            A direcao visual foi reposicionada para transmitir um produto proprietario com atmosfera editorial, foco em
            consumo de aulas e presenca forte na primeira dobra.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/login">Entrar na plataforma</ButtonLink>
            <ButtonLink href="/catalog">Explorar catalogo</ButtonLink>
            <Link className="ghost-link" href="/admin">
              Ver console administrativo
            </Link>
          </div>
          <div className="story-facts">
            <div className="story-fact">
              <span className="story-fact-label">foco da demo</span>
              <strong>entrada, biblioteca e operacao</strong>
            </div>
            <div className="story-fact">
              <span className="story-fact-label">tom visual</span>
              <strong>escuro, dourado e cinematografico</strong>
            </div>
            <div className="story-fact">
              <span className="story-fact-label">proxima retomada</span>
              <strong>{featuredCourse?.title ?? "catalogo principal"}</strong>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="story-stage-side">
          <span className="spotlight-badge">ambiente de demonstracao</span>
          <h3>{featuredCourse?.title ?? platformConfig.name}</h3>
          <p>{featuredCourse?.subtitle ?? "Plataforma proprietaria para cursos, afiliacao e operacao."}</p>
          <div className="story-list">
            <div className="story-list-item">
              <span>dominio ativo</span>
              <strong>{platformConfig.domain}</strong>
            </div>
            <div className="story-list-item">
              <span>fluxos prontos</span>
              <strong>login, checkout, learning e admin</strong>
            </div>
            <div className="story-list-item">
              <span>video</span>
              <strong>Panda Video + YouTube</strong>
            </div>
            <div className="story-list-item">
              <span>operacao financeira</span>
              <strong>Asaas sandbox-first</strong>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <DataStrip items={demoHomeMetrics} />

      <section className="content-section">
        <SectionHeading
          eyebrow="biblioteca em destaque"
          title="Cursos e ofertas com cara de produto pronto para venda"
          description="A vitrine agora trabalha em cima da mesma sensacao observada na referencia: fundo escuro, informacao bem hierarquizada e chamadas com calor comercial."
        />
        <div className="card-grid">
          {demoCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="operacao"
          title="Cada superficie responde a uma etapa critica da jornada"
          description="Aluno, produtor, afiliado e administracao enxergam a mesma plataforma, mas com fachadas e prioridades diferentes."
        />
        <div className="feature-grid">
          <SurfaceCard className="feature-card">
            <Pill>learning</Pill>
            <h3>Area do aluno</h3>
            <p>Retomada clara, video em destaque, curso organizado e ambiente que convida a continuar assistindo.</p>
          </SurfaceCard>
          <SurfaceCard className="feature-card">
            <Pill>studio</Pill>
            <h3>Estudio do produtor</h3>
            <p>Publicacao, rascunhos e leitura comercial sem tirar o produto do mesmo universo visual.</p>
          </SurfaceCard>
          <SurfaceCard className="feature-card">
            <Pill>affiliate</Pill>
            <h3>Painel do afiliado</h3>
            <p>Links rastreaveis, conversao e extrato com uma camada mais elegante para apresentacao.</p>
          </SurfaceCard>
          <SurfaceCard className="feature-card">
            <Pill>admin</Pill>
            <h3>Console administrativo</h3>
            <p>Curadoria de entrada, observabilidade financeira e seguranca minima de acesso para a demo.</p>
          </SurfaceCard>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="fila atual"
          title="Governanca suficiente para a plataforma nao crescer no escuro"
          description="A fundacao ja contempla fila de aprovacao e leitura operacional para a demonstracao nao parecer um mock desconectado."
        />
        <div className="queue-grid">
          {demoAdminQueue.map((item) => (
            <SurfaceCard key={item.id} className="queue-card">
              <Pill>{item.kind === "producer" ? "produtor" : "afiliado"}</Pill>
              <h3>{item.displayName}</h3>
              <p className="muted-label">estado: {item.state}</p>
              <p>{item.note}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="sinal social"
          title="A apresentacao comercial precisa parecer produto, nao improviso"
          description="Esses blocos ajudam a sustentar a narrativa de software proprietario com acabamento premium."
        />
        <div className="quote-grid">
          {demoTestimonials.map((testimonial) => (
            <SurfaceCard key={testimonial.name} className="quote-card">
              <p className="quote">"{testimonial.quote}"</p>
              <p className="muted-label">
                {testimonial.name} - {testimonial.role}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
