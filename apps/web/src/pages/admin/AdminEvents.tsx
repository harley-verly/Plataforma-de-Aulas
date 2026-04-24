import { AdminCrudPage, StatusBadge } from "@/components/admin/AdminCrudPage";
import { events } from "@/data/portal";

const AdminEvents = () => (
  <AdminCrudPage
    title="Eventos"
    subtitle="Crie, edite e publique encontros, feiras e capacitações."
    items={events}
    newLabel="Novo evento"
    columns={[
      { key: "title", label: "Título", className: "font-serif text-base" },
      { key: "category", label: "Categoria" },
      { key: "date", label: "Data", render: (e) => new Date(e.date).toLocaleDateString("pt-BR") },
      { key: "location", label: "Local" },
      { key: "status", label: "Status", render: (e) => <StatusBadge status={e.status} /> },
    ]}
    formFields={[
      { key: "title", label: "Título" },
      { key: "category", label: "Categoria" },
      { key: "date", label: "Data" },
      { key: "time", label: "Horário" },
      { key: "location", label: "Local" },
      { key: "excerpt", label: "Resumo" },
      { key: "description", label: "Descrição completa", type: "textarea" },
    ]}
  />
);

export default AdminEvents;
