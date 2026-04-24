import Link from "next/link";

import type { CourseItem } from "@plataforma/contracts";
import { Pill, SurfaceCard } from "@plataforma/ui";

export function CourseCard({ course }: { course: CourseItem }) {
  return (
    <SurfaceCard className="course-card">
      <img alt={course.title} className="course-card-image" src={course.thumbnailUrl} />
      <div className="course-card-body">
        <div className="course-card-meta">
          <Pill>{course.producerName}</Pill>
          <Pill>{course.audience}</Pill>
        </div>
        <h3>{course.title}</h3>
        <p>{course.summary}</p>
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
