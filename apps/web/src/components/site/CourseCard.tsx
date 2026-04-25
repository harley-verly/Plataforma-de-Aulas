import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";

type CourseCardCourse = {
  slug: string;
  title: string;
  excerpt: string;
  workload: string;
  modality: string;
  seats: number;
  image?: string;
  thumbnailUrl?: string;
};

export const CourseCard = ({ course }: { course: CourseCardCourse }) => {
  const imageSrc = course.thumbnailUrl ?? course.image;

  return (
    <Link
      to={`/cursos/${course.slug}`}
      className="group relative flex h-full flex-col overflow-hidden border border-ink-line bg-ink-soft transition-all duration-500 hover:border-gold/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={imageSrc}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute right-5 top-5 border border-gold/40 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
          {course.modality}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-serif text-2xl leading-tight text-paper text-balance">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-paper-muted">{course.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-ink-line pt-4 text-[11px] uppercase tracking-[0.22em] text-paper-muted">
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {course.workload}
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-gold" />
            {course.seats} vagas
          </span>
        </div>
      </div>
    </Link>
  );
};
