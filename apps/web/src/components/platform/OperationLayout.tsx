import type { ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  GraduationCap,
  LogOut,
  Presentation,
  Share2,
  ShieldCheck
} from "lucide-react";

import type { PlatformRole } from "@plataforma/contracts";

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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useDemoSession } from "@/hooks/use-demo-session";
import { clearDemoSession } from "@/lib/demo-session";
import { cn } from "@/lib/utils";

const navigationItems: Array<{
  to: string;
  label: string;
  icon: typeof GraduationCap;
  allowedRoles: PlatformRole[];
}> = [
  {
    to: "/learning",
    label: "Learning",
    icon: GraduationCap,
    allowedRoles: ["super_admin", "platform_admin", "support", "student"]
  },
  {
    to: "/studio",
    label: "Studio",
    icon: Presentation,
    allowedRoles: ["super_admin", "platform_admin", "producer"]
  },
  {
    to: "/affiliate",
    label: "Affiliate",
    icon: Share2,
    allowedRoles: ["super_admin", "platform_admin", "affiliate"]
  },
  {
    to: "/admin",
    label: "Admin",
    icon: ShieldCheck,
    allowedRoles: ["super_admin", "platform_admin", "support"]
  }
];

function getDisplayName(fullName?: string, email?: string) {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  return email ?? "Sessao ativa";
}

export const OperationLayout = ({
  title,
  subtitle,
  eyebrow = "Operacao",
  action,
  children
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const session = useDemoSession();
  const availableItems = navigationItems.filter((item) => (session ? item.allowedRoles.includes(session.role) : false));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-serif text-2xl text-paper">Plataforma</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold">operacao</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
                Modulos
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {availableItems.map((item) => {
                    const active = pathname === item.to || pathname.startsWith(`${item.to}/`);

                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={active}>
                          <NavLink
                            to={item.to}
                            className={cn(
                              "flex items-center gap-3 text-sm",
                              active ? "text-gold" : "text-paper-soft hover:text-paper"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
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

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ink-line bg-background/85 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-paper-soft hover:text-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">{eyebrow}</span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper-soft hover:text-gold"
              >
                Ver site <ArrowUpRight className="h-3 w-3" />
              </Link>

              <div className="hidden border border-gold/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-gold md:block">
                {getDisplayName(session?.fullName, session?.email)}
              </div>

              <button
                type="button"
                onClick={() => {
                  clearDemoSession();
                  navigate("/");
                }}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper-soft hover:text-gold"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </button>
            </div>
          </header>

          <main className="flex-1 px-6 py-10 md:px-10">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
                <h1 className="mt-3 font-serif text-4xl leading-tight text-paper md:text-5xl">{title}</h1>
                {subtitle ? <p className="mt-3 max-w-2xl text-sm text-paper-muted">{subtitle}</p> : null}
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
