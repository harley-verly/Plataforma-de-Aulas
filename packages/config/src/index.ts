export const platformConfig = {
  name: "Plataforma de Aulas",
  shortName: "Plataforma",
  domain: "aulas.abasolucoesetecnologia.com.br",
  supportEmail: "operacao@abasolucoesetecnologia.com.br",
  defaultCurrency: "BRL",
  stage: "staging",
  sections: [
    { label: "Catalogo", href: "/catalog" },
    { label: "Learning", href: "/learning" },
    { label: "Studio", href: "/studio" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Admin", href: "/admin" }
  ]
} as const;

export const routeByRole = {
  super_admin: "/admin",
  platform_admin: "/admin",
  producer: "/studio",
  affiliate: "/affiliate",
  student: "/learning",
  support: "/admin"
} as const;
