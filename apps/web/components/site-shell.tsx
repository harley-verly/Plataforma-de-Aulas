import Link from "next/link";

import { platformConfig } from "@plataforma/config";
import { ButtonLink } from "@plataforma/ui";

export function SiteShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <header className="topbar">
        <Link href="/" className="brand-mark">
          <span className="brand-dot" />
          <span>{platformConfig.name}</span>
        </Link>
        <nav className="topnav">
          {platformConfig.sections.map((section) => (
            <Link key={section.href} href={section.href}>
              {section.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/login">Entrar</ButtonLink>
      </header>

      <main className="main-content">
        <section className="page-hero">
          <p className="section-eyebrow">staging proprietario</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </section>
        {children}
      </main>
    </div>
  );
}
