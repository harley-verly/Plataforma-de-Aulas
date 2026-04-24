import { notFound } from "next/navigation";

import { SectionHeading } from "@plataforma/ui";

import { LearningCourseConsole } from "../../../components/learning-course-console";
import { SiteShell } from "../../../components/site-shell";
import { getLearningCourse } from "../../../lib/platform-api";

export default async function LearningCoursePage({
  params
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = await getLearningCourse(courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell title={course.title} subtitle="Consumo guiado com video, materiais e progresso por aula.">
      <section className="content-section">
        <SectionHeading
          eyebrow="progresso"
          title="Mapa de consumo"
          description="A jornada do aluno combina preview, drip controlado e materiais associados a cada aula."
        />
        <LearningCourseConsole initialCourse={course} />
      </section>
    </SiteShell>
  );
}
