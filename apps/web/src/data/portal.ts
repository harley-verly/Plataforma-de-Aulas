import eventFeature from "@/assets/event-feature.jpg";
import heroEntrepreneur from "@/assets/hero-entrepreneur.jpg";
import course1 from "@/assets/course-1.jpg";
import course2 from "@/assets/course-2.jpg";
import course3 from "@/assets/course-3.jpg";
import biz1 from "@/assets/biz-1.jpg";
import biz2 from "@/assets/biz-2.jpg";
import biz3 from "@/assets/biz-3.jpg";
import biz4 from "@/assets/biz-4.jpg";

export type EventItem = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string; // ISO
  time: string;
  location: string;
  image: string;
  category: string;
  status: "publicado" | "rascunho";
};

export type CourseItem = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  workload: string;
  modality: "Presencial" | "Online" | "Híbrido";
  seats: number;
  instructor: string;
  image: string;
  schedule: { week: string; topic: string }[];
  materials: { name: string; type: string }[];
  status: "publicado" | "rascunho";
};

export type BusinessItem = {
  slug: string;
  name: string;
  category: string;
  shortBio: string;
  description: string;
  image: string;
  contact: { phone: string; email: string; instagram?: string; site?: string };
  status: "publicado" | "rascunho";
};

export const events: EventItem[] = [
  {
    slug: "encontro-anual-empreendedoras",
    title: "Encontro Anual da Comunidade Empreendedora",
    excerpt: "Uma noite dedicada às histórias que constroem nossa associação.",
    description:
      "Reunimos sócios, parceiros e a comunidade para celebrar conquistas, compartilhar aprendizados e desenhar os próximos passos da ACMB. Programação inclui mesas-redondas, apresentações de cases e jantar de confraternização.",
    date: "2026-05-22",
    time: "19:00",
    location: "Espaço Cultural ACMB — Centro",
    image: eventFeature,
    category: "Institucional",
    status: "publicado",
  },
  {
    slug: "feira-de-negocios-locais",
    title: "Feira de Negócios Locais",
    excerpt: "Vitrine ao vivo da nossa comunidade empreendedora.",
    description:
      "Dois dias de exposição com mais de 60 empreendedores associados, oficinas abertas, food trucks e palestras curtas.",
    date: "2026-06-14",
    time: "10:00",
    location: "Praça Central",
    image: heroEntrepreneur,
    category: "Comunidade",
    status: "publicado",
  },
  {
    slug: "rodada-de-mentoria-financeira",
    title: "Rodada de Mentoria Financeira",
    excerpt: "Conversas individuais com mentores convidados.",
    description: "Sessões de 30 minutos com especialistas em gestão financeira, crédito e planejamento tributário.",
    date: "2026-04-30",
    time: "14:00",
    location: "Sede ACMB",
    image: course2,
    category: "Mentoria",
    status: "publicado",
  },
  {
    slug: "jantar-beneficente-2026",
    title: "Jantar Beneficente 2026",
    excerpt: "Recursos para projetos sociais da associação.",
    description: "Noite de gala com leilão de obras doadas por artistas locais.",
    date: "2025-11-08",
    time: "20:00",
    location: "Hotel Solar das Acácias",
    image: biz4,
    category: "Beneficente",
    status: "publicado",
  },
];

export const courses: CourseItem[] = [
  {
    slug: "fundamentos-do-empreendedorismo",
    title: "Fundamentos do Empreendedorismo",
    excerpt: "Da ideia ao primeiro cliente, em quatro semanas.",
    description:
      "Programa intensivo desenhado para quem está começando. Trabalhamos modelo de negócio, pesquisa de mercado, validação e primeiras vendas.",
    workload: "32h",
    modality: "Híbrido",
    seats: 24,
    instructor: "Camila Andrade",
    image: course1,
    schedule: [
      { week: "Semana 1", topic: "Mentalidade e descoberta de problema" },
      { week: "Semana 2", topic: "Modelo de negócio Canvas" },
      { week: "Semana 3", topic: "Validação e MVP" },
      { week: "Semana 4", topic: "Primeiras vendas e métricas" },
    ],
    materials: [
      { name: "Apostila completa", type: "PDF" },
      { name: "Templates de Canvas", type: "Figma" },
    ],
    status: "publicado",
  },
  {
    slug: "marketing-de-marca-para-pequenos-negocios",
    title: "Marketing de Marca para Pequenos Negócios",
    excerpt: "Construa uma marca que conversa antes de vender.",
    description:
      "Sete encontros sobre posicionamento, identidade visual, comunicação digital e estratégia de conteúdo aplicada ao pequeno negócio.",
    workload: "21h",
    modality: "Online",
    seats: 60,
    instructor: "Renato Coelho",
    image: course2,
    schedule: [
      { week: "Módulo 1", topic: "Posicionamento e proposta de valor" },
      { week: "Módulo 2", topic: "Identidade verbal e visual" },
      { week: "Módulo 3", topic: "Conteúdo e canais" },
    ],
    materials: [
      { name: "Guia de tom de voz", type: "PDF" },
      { name: "Checklist de marca", type: "PDF" },
    ],
    status: "publicado",
  },
  {
    slug: "gestao-financeira-essencial",
    title: "Gestão Financeira Essencial",
    excerpt: "Números claros, decisões corajosas.",
    description:
      "Capacitação prática para entender fluxo de caixa, precificação, margens e indicadores de saúde do negócio.",
    workload: "16h",
    modality: "Presencial",
    seats: 20,
    instructor: "Mariana Lopes",
    image: course3,
    schedule: [
      { week: "Encontro 1", topic: "Fluxo de caixa e DRE simplificado" },
      { week: "Encontro 2", topic: "Precificação por valor" },
      { week: "Encontro 3", topic: "Indicadores e tomada de decisão" },
    ],
    materials: [{ name: "Planilha de gestão", type: "XLSX" }],
    status: "publicado",
  },
  {
    slug: "vendas-consultivas",
    title: "Vendas Consultivas",
    excerpt: "Vender é servir com método.",
    description: "Técnicas modernas de prospecção, diagnóstico e fechamento aplicadas à realidade da pequena empresa.",
    workload: "12h",
    modality: "Online",
    seats: 40,
    instructor: "Pedro Vasques",
    image: course1,
    schedule: [
      { week: "Aula 1", topic: "Prospecção qualificada" },
      { week: "Aula 2", topic: "Diagnóstico e proposta" },
      { week: "Aula 3", topic: "Negociação e fechamento" },
    ],
    materials: [{ name: "Roteiro de descoberta", type: "PDF" }],
    status: "rascunho",
  },
];

export const businesses: BusinessItem[] = [
  {
    slug: "cafe-da-esquina",
    name: "Café da Esquina",
    category: "Gastronomia",
    shortBio: "Café de especialidade torrado na cidade.",
    description:
      "Há sete anos servindo grãos selecionados de pequenos produtores brasileiros, com salão acolhedor no centro histórico.",
    image: biz1,
    contact: {
      phone: "(11) 98888-1010",
      email: "ola@cafedaesquina.com.br",
      instagram: "@cafedaesquina",
      site: "cafedaesquina.com.br",
    },
    status: "publicado",
  },
  {
    slug: "atelier-barro",
    name: "Atelier Barro",
    category: "Artesanato",
    shortBio: "Cerâmica utilitária feita à mão.",
    description: "Peças torneadas uma a uma, com argila local e queima a alta temperatura. Aulas abertas aos sábados.",
    image: biz2,
    contact: { phone: "(11) 97777-2020", email: "contato@atelierbarro.com.br", instagram: "@atelierbarro" },
    status: "publicado",
  },
  {
    slug: "alfaiataria-rosa",
    name: "Alfaiataria Rosa",
    category: "Moda & Confecção",
    shortBio: "Sob medida há três gerações.",
    description: "Tradição de família dedicada à alfaiataria masculina e feminina, com tecidos italianos e ingleses.",
    image: biz3,
    contact: { phone: "(11) 96666-3030", email: "atendimento@alfaiatariarosa.com.br" },
    status: "publicado",
  },
  {
    slug: "florista-jardim-vivo",
    name: "Florista Jardim Vivo",
    category: "Decoração & Eventos",
    shortBio: "Arranjos florais autorais para todos os momentos.",
    description: "Composições com flores da estação, projetos para eventos e assinatura semanal para empresas.",
    image: biz4,
    contact: { phone: "(11) 95555-4040", email: "ola@jardimvivo.com.br", instagram: "@jardimvivo" },
    status: "publicado",
  },
];

export const institutional = {
  hero: "Onde a comunidade empreendedora encontra propósito.",
  history: [
    { year: "1998", title: "Fundação", text: "Doze empreendedores se reúnem para formalizar a associação." },
    { year: "2006", title: "Primeira sede", text: "Inauguração do espaço cultural no centro histórico da cidade." },
    { year: "2014", title: "Programa de cursos", text: "Lançamento da escola de capacitação para pequenos negócios." },
    { year: "2022", title: "Vitrine da comunidade", text: "Plataforma de visibilidade para mais de 200 negócios locais." },
  ],
  mvv: [
    { label: "Missão", text: "Fortalecer a comunidade empreendedora local com conhecimento, conexão e visibilidade." },
    { label: "Visão", text: "Ser referência em desenvolvimento de pequenos negócios na nossa região." },
    { label: "Valores", text: "Cooperação, integridade, diversidade, ética e protagonismo da comunidade." },
  ],
  objectives: [
    "Promover capacitações contínuas para empreendedores associados.",
    "Realizar eventos que conectem negócios, talentos e oportunidades.",
    "Divulgar e fortalecer os negócios locais junto à comunidade.",
    "Representar institucionalmente os interesses dos associados.",
    "Fomentar projetos sociais com impacto na cidade.",
  ],
};
