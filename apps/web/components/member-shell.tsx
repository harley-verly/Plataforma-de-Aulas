import Link from "next/link";

import type { PlatformRole } from "@plataforma/contracts";

import { getServerDemoSession } from "../lib/server-demo-session";
import { MemberSignOutButton } from "./member-signout-button";

function buildMemberNavigation(role: PlatformRole | undefined) {
  const items: Array<{ key: string; label: string; href: string }> = [
    { key: "learning", label: "Inicio", href: "/learning" },
    { key: "catalog", label: "Catalogo", href: "/catalog" }
  ];

  if (role === "producer" || role === "platform_admin" || role === "super_admin") {
    items.push({ key: "studio", label: "Studio", href: "/studio" });
  }

  if (role === "affiliate" || role === "platform_admin" || role === "super_admin") {
    items.push({ key: "affiliate", label: "Afiliacao", href: "/affiliate" });
  }

  if (role === "support" || role === "platform_admin" || role === "super_admin") {
    items.push({ key: "admin", label: "Admin", href: "/admin" });
  }

  items.push({ key: "support", label: "Suporte", href: "mailto:operacao@abasolucoesetecnologia.com.br" });

  return items;
}

function getDisplayName(fullName: string | undefined, email: string | undefined) {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  if (!email) {
    return "Convidado";
  }

  return email.split("@")[0] ?? email;
}

export async function MemberShell({
  currentSection,
  eyebrow,
  title,
  subtitle,
  bannerImage,
  children
}: {
  currentSection: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  bannerImage?: string;
  children: React.ReactNode;
}) {
  const session = await getServerDemoSession();
  const navigation = buildMemberNavigation(session?.role);
  const displayName = getDisplayName(session?.fullName, session?.email);

  return (
    <div className="member-app-shell">
      <header className="member-app-header">
        <div className="member-app-header-left">
          <Link href="/learning" className="member-brand">
            <span className="member-brand-dot" />
            <div className="member-brand-copy">
              <span className="member-brand-kicker">area de membros</span>
              <strong>Plataforma de Aulas</strong>
            </div>
          </Link>

          <nav className="member-app-nav" aria-label="Navegacao interna">
            {navigation.map((item) =>
              item.href.startsWith("mailto:") ? (
                <a key={item.key} className="member-nav-link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={item.key === currentSection ? "member-nav-link member-nav-link-active" : "member-nav-link"}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="member-app-header-right">
          <div className="member-welcome-chip">Bem vindo(a) {displayName}</div>
          <MemberSignOutButton />
        </div>
      </header>

      <main className="member-app-main">
        <section
          className="member-hero-banner"
          style={
            bannerImage
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(5, 5, 5, 0.86) 0%, rgba(5, 5, 5, 0.54) 42%, rgba(5, 5, 5, 0.78) 100%), url(${bannerImage})`
                }
              : undefined
          }
        >
          <div className="member-hero-content">
            <span className="member-hero-kicker">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </section>

        <div className="member-app-content">{children}</div>
      </main>
    </div>
  );
}
