import Link from "next/link";

import { SessionIndicator } from "./session-indicator";

export function SiteShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-app-shell">
      <div className="marketing-backdrop-glow" />
      <div className="portal-shell marketing-shell">
        <header className="shell-topbar marketing-header">
          <Link href="/" className="product-lockup public-brand-lockup marketing-brand-lockup">
            <div className="product-mark marketing-brand-mark">
              <span className="member-brand-dot" />
            </div>
            <div className="topbar-copy marketing-brand-copy">
              <strong>Plataforma de Aulas</strong>
            </div>
          </Link>

          <nav className="public-nav-links marketing-nav-links" aria-label="Navegacao externa">
            <Link href="/#funcionalidades">Funcionalidades</Link>
            <Link href="/catalog">Catalogo</Link>
            <Link href="/#produtores">Produtores</Link>
            <Link href="/#planos">Planos</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>

          <div className="public-session-slot marketing-session-slot">
            <SessionIndicator />
          </div>
        </header>

        <main className="marketing-main">{children}</main>
      </div>
    </div>
  );
}
