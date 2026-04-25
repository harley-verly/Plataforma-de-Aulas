import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Eye, GraduationCap, Store } from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { businesses, courses, events } from "@/data/portal";
import { getAdminOverview, getCatalogCourses } from "@/lib/platform-api";

const fallbackRecent = [
  { who: "Camila A.", what: "publicou o curso", target: "Fundamentos do Empreendedorismo", when: "há 2h" },
  { who: "Renato C.", what: "editou o evento", target: "Encontro Anual", when: "há 5h" },
  { who: "Atelier Barro", what: "submeteu cadastro de negócio", target: "—", when: "ontem" },
  { who: "Mariana L.", what: "criou o curso", target: "Gestão Financeira Essencial", when: "ontem" }
];

const fallbackShortcuts = [
  { to: "/admin/eventos", label: "Novo evento" },
  { to: "/admin/cursos", label: "Novo curso" },
  { to: "/admin/comunidade", label: "Aprovar negócios" },
  { to: "/admin/paginas", label: "Editar homepage" }
];

const AdminDashboard = () => {
  const { data: overview } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview
  });
  const { data: apiCourses } = useQuery({
    queryKey: ["catalog-courses"],
    queryFn: getCatalogCourses
  });

  const activeCourses =
    overview?.summary.activeCourses ??
    (apiCourses ?? courses).filter((course) => course.status === "publicado").length;

  const stats = [
    { label: "Eventos", value: events.length, hint: "publicados", to: "/admin/eventos", Icon: Calendar },
    {
      label: "Cursos ativos",
      value: activeCourses,
      hint: "com matrículas abertas",
      to: "/admin/cursos",
      Icon: GraduationCap
    },
    { label: "Negócios", value: businesses.length, hint: "na vitrine", to: "/admin/comunidade", Icon: Store },
    { label: "Visitas (30d)", value: "12.4k", hint: "+18% vs mês anterior", to: "/admin", Icon: Eye }
  ];

  const recent = overview?.recentActivity?.length ? overview.recentActivity : fallbackRecent;
  const shortcuts = overview?.shortcuts?.length ? overview.shortcuts : fallbackShortcuts;

  return (
    <AdminLayout
      title="Visão geral"
      subtitle="Acompanhe a saúde do portal e atalhos para os principais módulos."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="group relative flex flex-col justify-between border border-ink-line bg-ink-soft p-6 transition-all duration-500 hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <stat.Icon className="h-4 w-4 text-gold" />
              <ArrowUpRight className="h-4 w-4 text-paper-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <div className="mt-10">
              <div className="font-serif text-5xl text-paper">{stat.value}</div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gold">{stat.label}</p>
              <p className="mt-2 text-xs text-paper-muted">{stat.hint}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="border border-ink-line bg-ink-soft lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-line px-6 py-4">
            <h2 className="font-serif text-2xl text-paper">Atividade recente</h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">últimos 7 dias</span>
          </div>
          <ul className="divide-y divide-ink-line">
            {recent.map((item, index) => (
              <li key={`${item.who}-${index}`} className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm text-paper">
                    <span className="text-gold">{item.who}</span> {item.what}{" "}
                    <span className="italic text-paper-soft">{item.target}</span>
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-paper-muted">{item.when}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-ink-line bg-ink-soft p-6">
          <h2 className="font-serif text-2xl text-paper">Atalhos</h2>
          <div className="mt-6 space-y-2">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.to}
                to={shortcut.to}
                className="group flex items-center justify-between border border-ink-line bg-ink p-4 text-sm text-paper transition-all hover:border-gold/40 hover:text-gold"
              >
                {shortcut.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
