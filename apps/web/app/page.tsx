import Link from "next/link";

import { platformConfig } from "@plataforma/config";
import {
  demoAdminQueue,
  demoCourses,
  demoHomeMetrics,
  demoTestimonials
} from "@plataforma/contracts";
import { ButtonLink, DataStrip, Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { CourseCard } from "../components/course-card";
import { SiteShell } from "../components/site-shell";

export default function HomePage() {
  return (
    <SiteShell
      title="Plataforma proprietaria para aulas, vendas e operacao"
      subtitle="Um staging premium para provar a experiencia do aluno, o bastidor do produtor e a governanca comercial da plataforma."
    >
      <section className="hero-grid">
        <SurfaceCard className="hero-panel hero-panel-primary">
          <p className="section-eyebrow">catalogo + checkout + learning</p>
          <h2>Uma experiencia unica, sem cara de ferramenta remendada.</h2>
          <p>
            O objetivo deste produto e concentrar descoberta, oferta, compra, entrega,
            afiliacao e administracao em um software proprietario com acabamento premium.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/catalog">Explorar catalogo</ButtonLink>
            <Link className="ghost-link" href="/admin">
              Ver console administrativo
            </Link>
          </div>
        </SurfaceCard>

        <SurfaceCard className="hero-panel">
          <p className="section-eyebrow">dominio ativo</p>
          <h3>{platformConfig.domain}</h3>
          <ul className="check-list">
            <li>catalogo premium com ofertas avulsas e recorrentes</li>
            <li>member area com progresso, drip e certificados</li>
            <li>studio com publicacao e pipeline de aprovacao</li>
            <li>afiliacao com links, comissao e rastreio</li>
            <li>financeiro sandbox-first para Asaas</li>
          </ul>
        </SurfaceCard>
      </section>

      <DataStrip items={demoHomeMetrics} />

      <section className="content-section">
        <SectionHeading
          eyebrow="destaques"
          title="Cursos e ofertas prontos para uma prova comercial forte"
          description="O staging nasce com catalogo, narrativas de oferta e uma base visual preparada para ser apresentada ao cliente sem parecer prototipo cru."
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
          title="Cada area do produto resolve uma frente critica da jornada"
          description="A plataforma foi desenhada para que aluno, produtor, afiliado e administracao tenham superfices proprias, coerentes e escalaveis."
        />
        <div className="feature-grid">
          <SurfaceCard>
            <Pill>learning</Pill>
            <h3>Area do aluno</h3>
            <p>Retomada de progresso, drip controlado, materiais, certificados e continuidade comercial.</p>
          </SurfaceCard>
          <SurfaceCard>
            <Pill>studio</Pill>
            <h3>Estudio do produtor</h3>
            <p>Publicacao de curso, rascunho de oferta, aprovacoes e leitura consolidada da operacao.</p>
          </SurfaceCard>
          <SurfaceCard>
            <Pill>affiliate</Pill>
            <h3>Painel do afiliado</h3>
            <p>Links rastreaveis, leitura de conversao, extrato de comissao e trilha de aprovacao.</p>
          </SurfaceCard>
          <SurfaceCard>
            <Pill>admin</Pill>
            <h3>Console administrativo</h3>
            <p>Curadoria de entrada, observabilidade financeira e supervisao do staging premium.</p>
          </SurfaceCard>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="fila atual"
          title="Operacao administrativa pronta para governar crescimento"
          description="A fundacao ja contempla fila de aprovacao e leitura operacional para que a plataforma nao cresca sem controle."
        />
        <div className="queue-grid">
          {demoAdminQueue.map((item) => (
            <SurfaceCard key={item.id}>
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
          description="Esses blocos ajudam a compor uma narrativa de software serio para a fase de prova e validacao."
        />
        <div className="quote-grid">
          {demoTestimonials.map((testimonial) => (
            <SurfaceCard key={testimonial.name}>
              <p className="quote">“{testimonial.quote}”</p>
              <p className="muted-label">
                {testimonial.name} · {testimonial.role}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
