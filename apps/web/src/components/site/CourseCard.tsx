import { Link } from "react-router-dom";
import { BookOpenText, WalletCards } from "lucide-react";

import type { ApiCourseSummary } from "@/lib/platform-api";

export const CourseCard = ({ course }: { course: ApiCourseSummary }) => {
  const headlineOffer = course.offers[0];

  return (
    <Link
      to={`/catalog/${course.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-ink-line bg-ink-soft transition-all duration-500 hover:border-gold/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute right-5 top-5 border border-gold/40 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
          {course.producerName}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-serif text-2xl leading-tight text-paper text-balance">{course.title}</h3>
        <p className="line-clamp-3 text-sm text-paper-muted">{course.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-6 border-t border-ink-line pt-4 text-[11px] uppercase tracking-[0.22em] text-paper-muted">
          <span className="flex items-center gap-2">
            <BookOpenText className="h-3.5 w-3.5 text-gold" />
            <span className="line-clamp-1">{course.audience}</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap text-gold-soft">
            <WalletCards className="h-3.5 w-3.5 text-gold" />
            {headlineOffer?.priceLabel ?? "sob consulta"}
          </span>
        </div>
      </div>
    </Link>
  );
};
