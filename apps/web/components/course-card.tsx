import Link from "next/link";

import type { CourseItem } from "@plataforma/contracts";
import { Pill, SurfaceCard } from "@plataforma/ui";

export function CourseCard({ course }: { course: CourseItem }) {
  return (
    <SurfaceCard className="course-card">
      <div
        className="course-card-visual"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(6, 6, 6, 0.08), rgba(6, 6, 6, 0.86)), url(${course.thumbnailUrl})`
        }}
      >
        <div className="course-card-meta">
          <Pill>{course.category}</Pill>
          <Pill>{course.producerName}</Pill>
        </div>
        <div className="course-card-copy">
          <p className="course-card-kicker">{course.audience}</p>
          <h3>{course.title}</h3>
          <p>{course.subtitle}</p>
        </div>
      </div>
      <div className="course-card-body">
        <p>{course.summary}</p>
        <div className="inline-card">
          <p className="muted-label">Transformacao prometida</p>
          <p className="course-card-transformation">{course.transformation}</p>
        </div>
        <div className="course-card-offers">
          {course.offers.map((offer) => (
            <div key={offer.id} className="mini-offer">
              <span>{offer.title}</span>
              <strong>{offer.priceLabel}</strong>
            </div>
          ))}
        </div>
        <div className="action-row action-row-tight">
          <Link className="ghost-link" href={`/catalog/${course.slug}`}>
            Ver detalhes
          </Link>
          <Link className="button-link" href={`/checkout/${course.offers[0]?.id}?course=${course.slug}`}>
            Ir para checkout
          </Link>
        </div>
      </div>
    </SurfaceCard>
  );
}
