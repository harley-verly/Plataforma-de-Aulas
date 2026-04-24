import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EventItem } from "@/data/portal";
import { cn } from "@/lib/utils";

const monthShort = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export const EventCard = ({ event, large = false }: { event: EventItem; large?: boolean }) => {
  const d = new Date(event.date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = monthShort[d.getMonth()];
  const year = d.getFullYear();

  return (
    <Link
      to={`/eventos/${event.slug}`}
      className={cn(
        "group relative block overflow-hidden border border-ink-line bg-ink-soft transition-all duration-500 hover:border-gold/40",
        large ? "h-full" : "",
      )}
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[4/5]" : "aspect-[5/4]")}>
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute left-6 top-6 border border-gold/40 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
          {event.category}
        </div>
        <div className="absolute bottom-6 left-6 flex items-baseline gap-3 text-paper">
          <span className="font-serif text-6xl leading-none">{day}</span>
          <div className="text-[10px] uppercase tracking-[0.3em]">
            <div>{month}</div>
            <div className="text-paper-muted">{year}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-serif text-2xl leading-tight text-paper text-balance">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-paper-muted">{event.excerpt}</p>
        <div className="mt-3 flex items-center justify-between border-t border-ink-line pt-4 text-[11px] uppercase tracking-[0.22em]">
          <span className="text-paper-muted">{event.location}</span>
          <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
};
