import { MemberShell } from "../../components/member-shell";
import { StudioConsole } from "../../components/studio-console";
import { getStudioOverview } from "../../lib/platform-api";

export default async function StudioPage() {
  const overview = await getStudioOverview();

  return (
    <MemberShell
      currentSection="studio"
      eyebrow="studio do produtor"
      title="Studio"
      subtitle="Bastidor interno para cursos, pipeline e operacao do produtor ja aprovado."
    >
      <section className="member-page-section">
        <StudioConsole overview={overview} />
      </section>
    </MemberShell>
  );
}
