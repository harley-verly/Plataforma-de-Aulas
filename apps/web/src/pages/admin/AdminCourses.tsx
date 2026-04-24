import { AdminCrudPage, StatusBadge } from "@/components/admin/AdminCrudPage";
import { courses } from "@/data/portal";

const AdminCourses = () => (
  <AdminCrudPage
    title="Cursos"
    subtitle="Gerencie capacitações, oficinas e materiais complementares."
    items={courses}
    newLabel="Novo curso"
    columns={[
      { key: "title", label: "Título", className: "font-serif text-base" },
      { key: "modality", label: "Modalidade" },
      { key: "workload", label: "Carga" },
      { key: "instructor", label: "Instrutor(a)" },
      { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
    ]}
    formFields={[
      { key: "title", label: "Título" },
      { key: "modality", label: "Modalidade" },
      { key: "workload", label: "Carga horária" },
      { key: "seats", label: "Vagas" },
      { key: "instructor", label: "Instrutor(a)" },
      { key: "excerpt", label: "Resumo" },
      { key: "description", label: "Descrição", type: "textarea" },
    ]}
  />
);

export default AdminCourses;
