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
    <SiteShell
      eyebrow="conteudo do curso"
      title={course.title}
      subtitle="Consumo guiado com video em destaque, biblioteca lateral e progresso por aula."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="ritmo da trilha"
          title="Mapa de consumo"
          description="A jornada do aluno combina retomada, progresso visivel, video central e uma navegacao lateral mais parecida com uma area de membros premium."
        />
        <LearningCourseConsole initialCourse={course} />
      </section>
    </SiteShell>
  );
}
