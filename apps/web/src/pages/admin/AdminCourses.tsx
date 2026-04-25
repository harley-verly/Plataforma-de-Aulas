import { useQuery } from "@tanstack/react-query";

import { AdminCrudPage, StatusBadge } from "@/components/admin/AdminCrudPage";
import { courses } from "@/data/portal";
import { getCatalogCourses } from "@/lib/platform-api";

const AdminCourses = () => {
  const { data: apiCourses } = useQuery({
    queryKey: ["catalog-courses"],
    queryFn: getCatalogCourses
  });

  return (
    <AdminCrudPage
      title="Cursos"
      subtitle="Gerencie capacitações, oficinas e materiais complementares."
      items={apiCourses ?? courses}
      newLabel="Novo curso"
      columns={[
        { key: "title", label: "Título", className: "font-serif text-base" },
        { key: "modality", label: "Modalidade" },
        { key: "workload", label: "Carga" },
        { key: "instructor", label: "Instrutor(a)" },
        { key: "status", label: "Status", render: (course) => <StatusBadge status={course.status} /> }
      ]}
      formFields={[
        { key: "title", label: "Título" },
        { key: "modality", label: "Modalidade" },
        { key: "workload", label: "Carga horária" },
        { key: "seats", label: "Vagas" },
        { key: "instructor", label: "Instrutor(a)" },
        { key: "excerpt", label: "Resumo" },
        { key: "description", label: "Descrição", type: "textarea" }
      ]}
    />
  );
};

export default AdminCourses;
