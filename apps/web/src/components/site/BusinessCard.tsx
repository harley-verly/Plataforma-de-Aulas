import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BusinessItem } from "@/data/portal";

export const BusinessCard = ({ business }: { business: BusinessItem }) => (
  <Link
    to={`/comunidade/${business.slug}`}
    className="group relative flex flex-col gap-4 border border-ink-line bg-ink-soft p-5 transition-all duration-500 hover:border-gold/40"
  >
    <div className="relative aspect-square overflow-hidden">
      <img
        src={business.image}
        alt={business.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{business.category}</p>
        <h4 className="mt-1 font-serif text-xl leading-tight text-paper">{business.name}</h4>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-paper-muted transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
    </div>
    <p className="text-xs leading-relaxed text-paper-muted">{business.shortBio}</p>
  </Link>
);
