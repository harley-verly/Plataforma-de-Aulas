import { Edit3 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

const pages = [
  { id: "home", title: "Homepage", desc: "Hero, manifesto e blocos da página inicial.", blocks: 8 },
  { id: "institucional", title: "Institucional", desc: "Quem somos, história, missão, visão e valores.", blocks: 4 },
  { id: "contato", title: "Contato", desc: "Endereço, telefones e formulário institucional.", blocks: 2 },
];

const AdminPages = () => (
  <AdminLayout
    title="Páginas institucionais"
    subtitle="Edite blocos de conteúdo das páginas fixas do portal."
  >
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((p) => (
        <div
          key={p.id}
          className="group flex flex-col justify-between border border-ink-line bg-ink-soft p-6 transition-all duration-500 hover:border-gold/40"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Página</p>
            <h3 className="mt-3 font-serif text-3xl text-paper">{p.title}</h3>
            <p className="mt-3 text-sm text-paper-muted">{p.desc}</p>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-ink-line pt-5 text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            <span>{p.blocks} blocos</span>
            <button className="inline-flex items-center gap-2 text-gold hover:underline">
              <Edit3 className="h-3 w-3" /> Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  </AdminLayout>
);

export default AdminPages;
