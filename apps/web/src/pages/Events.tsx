import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { EventCard } from "@/components/site/EventCard";
import { events } from "@/data/portal";

const filters = ["Todos", "Próximos", "Passados"] as const;

const EventsPage = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const now = new Date();
  const list = useMemo(() => {
    if (filter === "Próximos") return events.filter((e) => new Date(e.date) >= now);
    if (filter === "Passados") return events.filter((e) => new Date(e.date) < now);
    return events;
  }, [filter, now]);

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-12 md:pt-20">
        <SectionLabel number="02">Eventos</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
          Encontros que <em className="italic text-gold-soft">transformam</em> a comunidade.
        </h1>
      </section>

      <section className="container-editorial pb-16">
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-line pb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                filter === f ? "bg-gold text-gold-foreground" : "text-paper-muted hover:text-paper"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default EventsPage;
