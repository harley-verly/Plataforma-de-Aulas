import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GoldButton } from "@/components/site/GoldButton";
import { EventCard } from "@/components/site/EventCard";
import { CourseCard } from "@/components/site/CourseCard";
import { BusinessCard } from "@/components/site/BusinessCard";
import { businesses, courses, events, institutional } from "@/data/portal";
import { getCatalogHome } from "@/lib/platform-api";
import heroImg from "@/assets/hero-entrepreneur.jpg";

const Index = () => {
  const { data: homeData } = useQuery({
    queryKey: ["catalog-home"],
    queryFn: getCatalogHome
  });
  const featuredEvent = events[0];
  const fallbackCourses = courses.filter((c) => c.status === "publicado");
  const featuredCourses = (homeData?.featuredCourses ?? fallbackCourses).slice(0, 3);
  const courseCount = homeData?.featuredCourses.length ?? fallbackCourses.length;
  const featuredBiz = businesses.slice(0, 4);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative">
        <div className="container-editorial pt-12 pb-10 md:pt-20 md:pb-16">
          <SectionLabel number="00" className="animate-fade-in">
            Portal Institucional
          </SectionLabel>

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Hero text */}
            <div className="lg:col-span-7">
              <h1 className="animate-fade-up font-serif text-[44px] leading-[0.98] text-paper text-balance md:text-[72px] lg:text-[92px]">
                Onde a comunidade
                <br />
                <em className="italic text-gold-soft">empreendedora</em>
                <br />
                encontra propósito.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-paper-soft md:text-lg animate-fade-up delay-200">
                A ACMB conecta pessoas, negócios e oportunidades. Eventos, capacitações e uma vitrine viva
                de quem move a economia da nossa cidade.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
                <GoldButton to="/comunidade">Conhecer a comunidade</GoldButton>
                <Link to="/institucional" className="editorial-link text-[11px] uppercase tracking-[0.25em]">
                  Sobre a associação
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 border-t border-ink-line pt-8 max-w-md animate-fade-up delay-500">
                {[
                  { n: "200+", l: "Negócios" },
                  { n: "25", l: "Anos" },
                  { n: "60", l: "Cursos/ano" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-4xl text-gold-soft">{s.n}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-paper-muted">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-ink-line">
                <img
                  src={heroImg}
                  alt="Empreendedora trabalhando em seu ateliê"
                  width={1600}
                  height={2000}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Em destaque</p>
                    <p className="mt-2 font-serif text-xl leading-tight">Atelier Barro — cerâmica autoral</p>
                  </div>
                  <Link
                    to="/comunidade/atelier-barro"
                    className="border border-paper/30 p-2 text-paper transition-colors hover:border-gold hover:text-gold"
                    aria-label="Ver negócio"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="absolute -inset-px -z-10 bg-gradient-radial-gold blur-2xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="relative">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {/* Institucional teaser */}
            <Link
              to="/institucional"
              className="group relative col-span-1 flex flex-col justify-between overflow-hidden border border-ink-line bg-ink-soft p-8 md:col-span-2 md:row-span-2 md:p-10 transition-all duration-500 hover:border-gold/40"
            >
              <div>
                <p className="font-serif text-7xl text-gold-soft md:text-8xl">01</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Institucional</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-paper md:text-4xl text-balance">
                  Quem <em className="italic text-gold-soft">somos</em> e o que nos move há 25 anos.
                </h3>
                <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                  Conhecer a história
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-radial-gold opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </Link>

            {/* Featured event */}
            <div className="md:col-span-4 md:row-span-2">
              <EventCard event={featuredEvent} large />
            </div>

            {/* Manifesto */}
            <div className="relative col-span-1 border border-ink-line bg-gradient-ink p-8 md:col-span-3 md:p-10">
              <SectionLabel number="02">Manifesto</SectionLabel>
              <p className="mt-6 font-serif text-2xl leading-snug text-paper md:text-3xl">
                Acreditamos que <em className="italic text-gold-soft">pequenos negócios</em> sustentam
                grandes cidades. Nosso papel é dar a eles palco, ferramentas e companhia.
              </p>
            </div>

            {/* Quick stats / CTA */}
            <Link
              to="/cursos"
              className="group col-span-1 flex flex-col justify-between border border-ink-line bg-ink-soft p-8 transition-all duration-500 hover:border-gold/40 md:col-span-3"
            >
              <div className="flex items-start justify-between">
                <SectionLabel number="03">Capacitações</SectionLabel>
                <ArrowUpRight className="h-5 w-5 text-paper-muted transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="mt-10">
                <p className="font-serif text-5xl leading-none text-paper md:text-6xl">
                  {courseCount} <span className="text-gold-soft">cursos</span>
                </p>
                <p className="mt-3 text-sm text-paper-muted">com matrículas abertas para o próximo ciclo.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CURSOS DESTAQUE */}
      <section className="relative">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel number="04">Cursos em destaque</SectionLabel>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] text-paper md:text-6xl text-balance">
                Capacitações desenhadas para
                <br />
                <em className="italic text-gold-soft">quem realiza.</em>
              </h2>
            </div>
            <GoldButton to="/cursos" variant="ghost">
              Ver todos os cursos
            </GoldButton>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDADE */}
      <section className="relative bg-ink-soft/60">
        <div className="container-editorial py-16 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel number="05">Comunidade Empreendedora</SectionLabel>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-paper md:text-5xl text-balance">
                Vitrine viva dos negócios <em className="italic text-gold-soft">que constroem</em> a cidade.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-paper-soft">
                Mais de duzentos empreendedores cadastrados em uma plataforma feita para ser encontrada.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton to="/comunidade">Explorar vitrine</GoldButton>
                <Link to="/comunidade/cadastrar" className="editorial-link text-[11px] uppercase tracking-[0.25em]">
                  Cadastrar meu negócio
                </Link>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {featuredBiz.map((b) => (
                <BusinessCard key={b.slug} business={b} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO/VISÃO/VALORES strip */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-3">
          {institutional.mvv.map((m, i) => (
            <div key={m.label} className="bg-ink-soft p-8 md:p-10">
              <p className="font-serif text-5xl text-gold-soft">{(i + 1).toString().padStart(2, "0")}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-gold">{m.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-paper-soft">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-editorial pb-24">
        <div className="relative overflow-hidden border border-gold/20 bg-gradient-ink p-10 md:p-16">
          <div className="absolute inset-0 -z-10 bg-gradient-radial-gold opacity-50" />
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <SectionLabel>Boletim ACMB</SectionLabel>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-paper md:text-5xl text-balance">
                Receba <em className="italic text-gold-soft">primeiro</em> as novidades da associação.
              </h2>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-muted" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="h-14 w-full border border-ink-line bg-ink/60 pl-12 pr-4 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="hover-gold-shimmer h-14 px-8 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
