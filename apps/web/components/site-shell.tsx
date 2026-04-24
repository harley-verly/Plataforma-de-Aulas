import Link from "next/link";

import { SessionIndicator } from "./session-indicator";

export function SiteShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-app-shell">
      <div className="portal-shell">
        <header className="shell-topbar">
          <Link href="/" className="product-lockup public-brand-lockup">
            <div className="product-mark">
              <span className="member-brand-dot" />
            </div>
            <div className="topbar-copy">
              <span className="eyebrow">plataforma proprietaria</span>
              <strong>Plataforma de Aulas</strong>
              <p>Catalogo, checkout e area do aluno em uma experiencia unica.</p>
            </div>
          </Link>

          <nav className="public-nav-links" aria-label="Navegacao externa">
            <Link href="/">Inicio</Link>
            <Link href="/catalog">Catalogo</Link>
            <Link href="/#estrutura">Estrutura</Link>
            <Link href="/#experiencia">Experiencia</Link>
          </nav>

          <div className="public-session-slot">
            <SessionIndicator />
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
