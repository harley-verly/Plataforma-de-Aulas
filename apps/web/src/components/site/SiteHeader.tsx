import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

import { useDemoSession } from "@/hooks/use-demo-session";
import { getDefaultRouteForRole } from "@/lib/access";
import { clearDemoSession } from "@/lib/demo-session";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/catalog", label: "Catalogo" }
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const session = useDemoSession();
  const primaryActionHref = session ? getDefaultRouteForRole(session.role) : "/login";
  const primaryActionLabel = session ? "Minha area" : "Entrar";

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-background/85 backdrop-blur-xl">
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-3" aria-label="Plataforma de Aulas">
          <span className="font-serif text-3xl leading-none tracking-tight text-paper">Plataforma</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-paper-muted md:inline">
            premium de aulas
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-[12px] uppercase tracking-[0.22em] transition-colors duration-300",
                  isActive ? "text-gold" : "text-paper-soft hover:text-paper"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {session ? (
            <button
              type="button"
              onClick={clearDemoSession}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-paper-muted transition-colors hover:text-gold"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          ) : null}

          <Link
            to={primaryActionHref}
            className="group relative inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-gold-foreground"
          >
            {primaryActionLabel}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <button
          className="lg:hidden text-paper"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-ink-line bg-ink-soft">
          <nav className="container-editorial flex flex-col gap-4 py-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "py-2 text-sm uppercase tracking-[0.22em]",
                    isActive ? "text-gold" : "text-paper-soft"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 flex flex-col gap-2 border-t border-ink-line pt-4">
              <Link
                to={primaryActionHref}
                onClick={() => setOpen(false)}
                className="border border-gold/40 px-4 py-2 text-center text-[11px] uppercase tracking-[0.22em] text-gold"
              >
                {primaryActionLabel}
              </Link>
              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    clearDemoSession();
                    setOpen(false);
                  }}
                  className="text-center text-[11px] uppercase tracking-[0.22em] text-paper-muted"
                >
                  Sair
                </button>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
