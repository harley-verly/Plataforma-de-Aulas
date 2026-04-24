import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GoldButton } from "@/components/site/GoldButton";
import { institutional } from "@/data/portal";
import aboutImg from "@/assets/about-history.jpg";

const Institutional = () => (
  <SiteLayout>
    <section className="container-editorial pt-12 pb-16 md:pt-20 md:pb-20">
      <SectionLabel number="01">Institucional</SectionLabel>
      <h1 className="mt-8 max-w-5xl font-serif text-5xl leading-[0.98] text-paper md:text-7xl lg:text-8xl text-balance animate-fade-up">
        Uma associação <em className="italic text-gold-soft">pelas pessoas</em> que constroem a economia local.
      </h1>
      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper-soft animate-fade-up delay-200">
        Há 25 anos a ACMB representa, capacita e dá visibilidade à comunidade empreendedora da nossa
        região. Acreditamos no poder dos pequenos negócios para transformar bairros, gerar renda e
        cultivar identidade local.
      </p>
    </section>

    <section className="relative">
      <div className="container-editorial">
        <div className="relative aspect-[21/9] overflow-hidden border border-ink-line">
          <img src={aboutImg} alt="Fachada histórica" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
      </div>
    </section>

    {/* HISTÓRIA — timeline */}
    <section className="container-editorial py-20 md:py-28">
      <SectionLabel number="02">História</SectionLabel>
      <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-paper md:text-5xl text-balance">
        Marcos que <em className="italic text-gold-soft">moldaram</em> nossa trajetória.
      </h2>

      <div className="mt-14 grid gap-px bg-ink-line md:grid-cols-4">
        {institutional.history.map((m, i) => (
          <div key={m.year} className="bg-background p-8">
            <p className="font-serif text-6xl text-gold-soft">{m.year}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-gold">
              {String(i + 1).padStart(2, "0")} — {m.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper-soft">{m.text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* MVV */}
    <section className="container-editorial py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel number="03">Identidade</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-paper md:text-5xl text-balance">
            Missão, visão e <em className="italic text-gold-soft">valores.</em>
          </h2>
        </div>
        <div className="grid gap-5 lg:col-span-8">
          {institutional.mvv.map((m, i) => (
            <div
              key={m.label}
              className="grid gap-6 border border-ink-line bg-ink-soft p-8 md:grid-cols-[1fr_3fr] md:p-10"
            >
              <div>
                <p className="font-serif text-5xl text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-gold">{m.label}</p>
              </div>
              <p className="font-serif text-2xl leading-snug text-paper md:text-3xl">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* OBJETIVOS */}
    <section className="container-editorial py-20 md:py-28">
      <SectionLabel number="04">Objetivos institucionais</SectionLabel>
      <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-paper md:text-5xl text-balance">
        O que <em className="italic text-gold-soft">guia</em> nossas decisões.
      </h2>
      <ol className="mt-12 grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2">
        {institutional.objectives.map((o, i) => (
          <li key={o} className="flex items-start gap-6 bg-background p-8">
            <span className="font-serif text-3xl text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-base leading-relaxed text-paper-soft">{o}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className="container-editorial py-20 text-center">
      <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-paper md:text-5xl text-balance">
        Quer fazer parte da <em className="italic text-gold-soft">próxima década</em> da ACMB?
      </h2>
      <div className="mt-10 flex justify-center">
        <GoldButton to="/contato">Entrar em contato</GoldButton>
      </div>
    </section>
  </SiteLayout>
);

export default Institutional;
