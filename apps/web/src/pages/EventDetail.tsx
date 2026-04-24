import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GoldButton } from "@/components/site/GoldButton";
import { events } from "@/data/portal";

const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const EventDetail = () => {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);
  if (!event) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32 text-center">
          <h1 className="font-serif text-4xl text-paper">Evento não encontrado</h1>
          <Link to="/eventos" className="mt-6 inline-block editorial-link">Voltar para eventos</Link>
        </div>
      </SiteLayout>
    );
  }

  const d = new Date(event.date);
  const formatted = `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;

  return (
    <SiteLayout>
      <section className="relative">
        <div className="relative aspect-[21/10] w-full overflow-hidden">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>
        <div className="container-editorial -mt-32 relative">
          <SectionLabel className="mb-6">{event.category}</SectionLabel>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="container-editorial mt-16 grid gap-12 pb-24 lg:grid-cols-12">
        <article className="lg:col-span-8 space-y-8">
          <p className="font-serif text-2xl leading-snug text-paper-soft md:text-3xl">{event.excerpt}</p>
          <div className="gold-rule" />
          <p className="text-base leading-relaxed text-paper-soft">{event.description}</p>
          <p className="text-base leading-relaxed text-paper-soft">
            Programação completa e materiais de apoio serão divulgados em primeira mão para inscritos no
            boletim institucional. Vagas limitadas — recomendamos garantir presença com antecedência.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <GoldButton>Inscrever-se</GoldButton>
            <button className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper-muted hover:text-gold">
              <Share2 className="h-3.5 w-3.5" /> Compartilhar
            </button>
          </div>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-ink-line bg-ink-soft p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Detalhes</p>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-4 border-b border-ink-line pb-5">
                <Calendar className="h-4 w-4 mt-1 text-gold" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Data</div>
                  <div className="text-paper">{formatted}</div>
                </div>
              </li>
              <li className="flex items-start gap-4 border-b border-ink-line pb-5">
                <Clock className="h-4 w-4 mt-1 text-gold" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Horário</div>
                  <div className="text-paper">{event.time}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-4 w-4 mt-1 text-gold" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Local</div>
                  <div className="text-paper">{event.location}</div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
};

export default EventDetail;
