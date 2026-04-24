import { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  Store,
  FileText,
  Image as ImageIcon,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: "/admin/eventos", label: "Eventos", icon: Calendar },
  { to: "/admin/cursos", label: "Cursos", icon: GraduationCap },
  { to: "/admin/comunidade", label: "Comunidade", icon: Store },
  { to: "/admin/paginas", label: "Páginas", icon: FileText },
  { to: "/admin/midia", label: "Mídia", icon: ImageIcon },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl text-paper">ACMB</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold">painel</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            Gestão
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => {
                const active = it.end ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <SidebarMenuItem key={it.to}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={it.to}
                        end={it.end}
                        className={cn(
                          "flex items-center gap-3 text-sm",
                          active ? "text-gold" : "text-paper-soft hover:text-paper",
                        )}
                      >
                        <it.icon className="h-4 w-4" />
                        <span>{it.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export const AdminLayout = ({ children, title, subtitle, action }: { children: ReactNode; title: string; subtitle?: string; action?: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ink-line bg-background/85 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-paper-soft hover:text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">ACMB / Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-paper-muted hover:text-gold">
                <Bell className="h-4 w-4" />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper-soft hover:text-gold"
              >
                Ver site <ArrowUpRight className="h-3 w-3" />
              </Link>
              <div className="flex h-8 w-8 items-center justify-center border border-gold/40 text-[10px] uppercase tracking-widest text-gold">
                AC
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-10 md:px-10">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Painel</p>
                <h1 className="mt-3 font-serif text-4xl leading-tight text-paper md:text-5xl">{title}</h1>
                {subtitle && <p className="mt-3 max-w-2xl text-sm text-paper-muted">{subtitle}</p>}
              </div>
              {action}
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
