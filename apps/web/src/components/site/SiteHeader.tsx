import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/institucional", label: "Institucional" },
  { to: "/eventos", label: "Eventos" },
  { to: "/cursos", label: "Cursos" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/contato", label: "Contato" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-background/85 backdrop-blur-xl">
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-3" aria-label="ACMB">
          <span className="font-serif text-3xl leading-none tracking-tight text-paper">ACMB</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-paper-muted md:inline">
            est. 1998
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-[12px] uppercase tracking-[0.22em] transition-colors duration-300",
                  isActive ? "text-gold" : "text-paper-soft hover:text-paper",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/comunidade/cadastrar"
            className="group relative inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-gold-foreground"
          >
            Cadastrar negócio
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/admin"
            className="text-[11px] uppercase tracking-[0.22em] text-paper-muted hover:text-gold"
          >
            Admin
          </Link>
        </div>

        <button
          className="lg:hidden text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-line bg-ink-soft">
          <nav className="container-editorial flex flex-col gap-4 py-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "py-2 text-sm uppercase tracking-[0.22em]",
                    isActive ? "text-gold" : "text-paper-soft",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-line pt-4">
              <Link
                to="/comunidade/cadastrar"
                onClick={() => setOpen(false)}
                className="border border-gold/40 px-4 py-2 text-center text-[11px] uppercase tracking-[0.22em] text-gold"
              >
                Cadastrar negócio
              </Link>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="text-center text-[11px] uppercase tracking-[0.22em] text-paper-muted"
              >
                Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
