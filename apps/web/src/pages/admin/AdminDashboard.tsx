import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  GraduationCap,
  Store,
  Eye,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { businesses, courses, events } from "@/data/portal";

const AdminDashboard = () => {
  const stats = [
    { label: "Eventos", value: events.length, hint: "publicados", to: "/admin/eventos", Icon: Calendar },
    { label: "Cursos ativos", value: courses.filter((c) => c.status === "publicado").length, hint: "com matrículas abertas", to: "/admin/cursos", Icon: GraduationCap },
    { label: "Negócios", value: businesses.length, hint: "na vitrine", to: "/admin/comunidade", Icon: Store },
    { label: "Visitas (30d)", value: "12.4k", hint: "+18% vs mês anterior", to: "/admin", Icon: Eye },
  ];

  const recent = [
    { who: "Camila A.", what: "publicou o curso", target: "Fundamentos do Empreendedorismo", when: "há 2h" },
    { who: "Renato C.", what: "editou o evento", target: "Encontro Anual", when: "há 5h" },
    { who: "Atelier Barro", what: "submeteu cadastro de negócio", target: "—", when: "ontem" },
    { who: "Mariana L.", what: "criou o curso", target: "Gestão Financeira Essencial", when: "ontem" },
  ];

  return (
    <AdminLayout
      title="Visão geral"
      subtitle="Acompanhe a saúde do portal e atalhos para os principais módulos."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group relative flex flex-col justify-between border border-ink-line bg-ink-soft p-6 transition-all duration-500 hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <s.Icon className="h-4 w-4 text-gold" />
              <ArrowUpRight className="h-4 w-4 text-paper-muted transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="mt-10">
              <div className="font-serif text-5xl text-paper">{s.value}</div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gold">{s.label}</p>
              <p className="mt-2 text-xs text-paper-muted">{s.hint}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 border border-ink-line bg-ink-soft">
          <div className="flex items-center justify-between border-b border-ink-line px-6 py-4">
            <h2 className="font-serif text-2xl text-paper">Atividade recente</h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">últimos 7 dias</span>
          </div>
          <ul className="divide-y divide-ink-line">
            {recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm text-paper">
                    <span className="text-gold">{r.who}</span> {r.what} <span className="italic text-paper-soft">{r.target}</span>
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-paper-muted">{r.when}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-ink-line bg-ink-soft p-6">
          <h2 className="font-serif text-2xl text-paper">Atalhos</h2>
          <div className="mt-6 space-y-2">
            {[
              { to: "/admin/eventos", label: "Novo evento" },
              { to: "/admin/cursos", label: "Novo curso" },
              { to: "/admin/comunidade", label: "Aprovar negócios" },
              { to: "/admin/paginas", label: "Editar homepage" },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group flex items-center justify-between border border-ink-line bg-ink p-4 text-sm text-paper transition-all hover:border-gold/40 hover:text-gold"
              >
                {a.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
