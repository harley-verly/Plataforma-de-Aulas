import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteLayoutMode } from "./SiteLayout";

const links = [
  { to: "/institucional", label: "Institucional" },
  { to: "/eventos", label: "Eventos" },
  { to: "/cursos", label: "Cursos" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/contato", label: "Contato" }
];

type Props = {
  mode?: SiteLayoutMode;
};

export const SiteHeader = ({ mode = "default" }: Props) => {
  const [open, setOpen] = useState(false);
  const isProposalMode = mode === "proposal";

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-background/85 backdrop-blur-xl">
      <div className="container-editorial flex h-20 items-center justify-between">
        {isProposalMode ? (
          <div className="group flex items-baseline gap-3" aria-label="ACMB">
            <span className="font-serif text-3xl leading-none tracking-tight text-paper">ACMB</span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-paper-muted md:inline">
              est. 1998
            </span>
          </div>
        ) : (
          <Link to="/" className="group flex items-baseline gap-3" aria-label="ACMB">
            <span className="font-serif text-3xl leading-none tracking-tight text-paper">ACMB</span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-paper-muted md:inline">
              est. 1998
            </span>
          </Link>
        )}

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {links.map((link) =>
            isProposalMode ? (
              <span
                key={link.to}
                className="cursor-default text-[12px] uppercase tracking-[0.22em] text-paper-soft"
                aria-disabled="true"
              >
                {link.label}
              </span>
            ) : (
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
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {isProposalMode ? (
            <>
              <span className="inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold">
                Cadastrar negócio
                <span>→</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-paper-muted">Admin</span>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {!isProposalMode && (
          <button
            className="text-paper lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      {!isProposalMode && open && (
        <div className="border-t border-ink-line bg-ink-soft lg:hidden">
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
