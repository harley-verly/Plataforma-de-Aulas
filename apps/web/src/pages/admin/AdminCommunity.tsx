import { AdminCrudPage, StatusBadge } from "@/components/admin/AdminCrudPage";
import { businesses } from "@/data/portal";

const AdminCommunity = () => (
  <AdminCrudPage
    title="Comunidade Empreendedora"
    subtitle="Aprove cadastros e mantenha a vitrine sempre atualizada."
    items={businesses}
    newLabel="Novo negócio"
    columns={[
      { key: "name", label: "Negócio", className: "font-serif text-base" },
      { key: "category", label: "Categoria" },
      { key: "shortBio", label: "Bio" },
      { key: "status", label: "Status", render: (b) => <StatusBadge status={b.status} /> },
    ]}
    formFields={[
      { key: "name", label: "Nome do negócio" },
      { key: "category", label: "Categoria" },
      { key: "shortBio", label: "Mini-bio" },
      { key: "description", label: "Descrição", type: "textarea" },
    ]}
  />
);

export default AdminCommunity;
