import { notFound } from "next/navigation";

import { LearningCourseConsole } from "../../../components/learning-course-console";
import { MemberShell } from "../../../components/member-shell";
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
    <MemberShell
      bannerImage={course.thumbnailUrl}
      currentSection="learning"
      eyebrow="conteudo do curso"
      title={course.title}
      subtitle="Consumo guiado com video em destaque, progresso visivel e navegacao lateral no mesmo clima da referencia WordPress."
    >
      <section className="member-page-section">
        <LearningCourseConsole initialCourse={course} />
      </section>
    </MemberShell>
  );
}
