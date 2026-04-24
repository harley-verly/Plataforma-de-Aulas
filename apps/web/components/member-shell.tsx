import Image from "next/image";
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
  const heroImage = bannerImage ?? "/references/harley-bio-dourada-2.png";

  return (
    <div className="member-app-shell academy-member-shell">
      <header className="member-app-header academy-member-header">
        <div className="member-app-header-left academy-member-header-left">
          <Link href="/learning" className="member-brand academy-member-brand">
            <Image src="/references/logo-sem-fundo-192.png" alt="Instituto Metaterapia" width={44} height={44} />
            <div className="member-brand-copy academy-member-brand-copy">
              <strong>Plataforma de Aulas</strong>
            </div>
          </Link>

          <nav className="member-app-nav academy-member-nav" aria-label="Navegacao interna">
            {navigation.map((item) =>
              item.href.startsWith("mailto:") ? (
                <a key={item.key} className="member-nav-link academy-member-nav-link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    item.key === currentSection
                      ? "member-nav-link academy-member-nav-link member-nav-link-active"
                      : "member-nav-link academy-member-nav-link"
                  }
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="member-app-header-right academy-member-header-right">
          <div className="member-welcome-chip academy-member-welcome-chip">Bem vindo(a) {displayName}</div>
          <MemberSignOutButton />
        </div>
      </header>

      <main className="member-app-main academy-member-main">
        <section
          className="member-hero-banner academy-member-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(6, 6, 6, 0.88) 0%, rgba(6, 6, 6, 0.58) 38%, rgba(6, 6, 6, 0.88) 100%), url(${heroImage})`
          }}
        >
          <div className="academy-member-hero-noise" />
          <div className="member-hero-content academy-member-hero-content">
            <span className="member-hero-kicker academy-member-pill">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="academy-member-hero-side">
            <div className="academy-member-hero-name">{displayName}</div>
            <div className="academy-member-logo-frame">
              <Image
                src="/references/logo-deitado-lobus.png"
                alt="Instituto Metaterapia"
                width={360}
                height={96}
                className="academy-member-logo-image"
              />
            </div>
          </div>
        </section>

        <div className="member-app-content academy-member-content">{children}</div>
      </main>
    </div>
  );
}
