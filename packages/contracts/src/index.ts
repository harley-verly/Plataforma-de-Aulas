export type PlatformRole =
  | "super_admin"
  | "platform_admin"
  | "producer"
  | "affiliate"
  | "student"
  | "support";

export type ApprovalState = "pending_review" | "approved" | "needs_adjustment";
export type VideoProvider = "panda" | "youtube";
export type OfferBillingModel = "one_time" | "subscription";

export interface LessonVideoSource {
  videoProvider: VideoProvider;
  externalVideoId: string;
  embedUrl: string;
  allowedDomains: string[];
  durationSec: number;
  captionsUrl?: string | null;
}

export interface LessonAsset {
  label: string;
  url: string;
}

export interface LessonItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  isPreview: boolean;
  dripAfterDays: number;
  video: LessonVideoSource;
  assets: LessonAsset[];
}

export interface CourseModuleItem {
  id: string;
  title: string;
  description: string;
  lessons: LessonItem[];
}

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  priceInCents: number;
  billingModel: OfferBillingModel;
  recurrenceLabel?: string;
}

export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  thumbnailUrl: string;
  producerName: string;
  category: string;
  audience: string;
  transformation: string;
  offers: OfferItem[];
  modules: CourseModuleItem[];
}

export interface DashboardMetric {
  label: string;
  value: string;
  note: string;
}

export interface ApprovalQueueItem {
  id: string;
  kind: "producer" | "affiliate";
  displayName: string;
  state: ApprovalState;
  note: string;
}

export const platformRoles: PlatformRole[] = [
  "super_admin",
  "platform_admin",
  "producer",
  "affiliate",
  "student",
  "support"
];

export const demoCourses: CourseItem[] = [
  {
    id: "course-premium-ops",
    slug: "operacao-premium-de-cursos",
    title: "Operacao Premium de Cursos",
    subtitle: "Da oferta ao acompanhamento do aluno com governanca e previsibilidade.",
    summary:
      "Programa focado em estruturar produto, catalogo, ofertas, operacao de membros e indicadores para uma escola digital proprietaria.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    producerName: "Equipe Plataforma de Aulas",
    category: "Gestao e Operacao",
    audience: "Produtores, equipes de operacao e gestores de educacao digital",
    transformation:
      "Sair de uma operacao improvisada para uma esteira com produto, oferta, onboarding e acompanhamento claros.",
    offers: [
      {
        id: "offer-premium-once",
        title: "Acesso completo",
        description: "Compra avulsa com trilha completa, materiais e certificado.",
        priceLabel: "R$ 897,00",
        priceInCents: 89700,
        billingModel: "one_time"
      },
      {
        id: "offer-premium-sub",
        title: "Mentoria mensal",
        description: "Acesso recorrente com encontros e atualizacoes mensais.",
        priceLabel: "R$ 197,00",
        priceInCents: 19700,
        billingModel: "subscription",
        recurrenceLabel: "mensal"
      }
    ],
    modules: [
      {
        id: "module-positioning",
        title: "Posicionamento e proposta",
        description: "Como transformar conteudo em uma oferta clara e premium.",
        lessons: [
          {
            id: "lesson-positioning-1",
            slug: "diagnostico-da-oferta",
            title: "Diagnostico da oferta",
            summary: "Mapeamento de publico, promessa e diferenciais.",
            isPreview: true,
            dripAfterDays: 0,
            video: {
              videoProvider: "panda",
              externalVideoId: "pv_001",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_001",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 1180,
              captionsUrl: "https://cdn.example.com/captions/pv_001.vtt"
            },
            assets: [
              {
                label: "Template de diagnostico",
                url: "/assets/templates/diagnostico-oferta.pdf"
              }
            ]
          },
          {
            id: "lesson-positioning-2",
            slug: "arquitetura-da-promessa",
            title: "Arquitetura da promessa",
            summary: "Estrutura de narrativa para pagina, checkout e onboarding.",
            isPreview: false,
            dripAfterDays: 1,
            video: {
              videoProvider: "youtube",
              externalVideoId: "dQw4w9WgXcQ",
              embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 980,
              captionsUrl: null
            },
            assets: []
          }
        ]
      },
      {
        id: "module-growth",
        title: "Entrega, metricas e continuidade",
        description: "Playbook de progresso, retencao e reoferta.",
        lessons: [
          {
            id: "lesson-growth-1",
            slug: "ritmo-de-consumo",
            title: "Ritmo de consumo",
            summary: "Como desenhar modulos, drip e checkpoints.",
            isPreview: false,
            dripAfterDays: 3,
            video: {
              videoProvider: "panda",
              externalVideoId: "pv_002",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_002",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 1420,
              captionsUrl: null
            },
            assets: [
              {
                label: "Planilha de checkpoints",
                url: "/assets/templates/checkpoints.xlsx"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "course-affiliate-engine",
    slug: "maquina-de-afiliacao-com-governanca",
    title: "Maquina de Afiliacao com Governanca",
    subtitle: "Aquisicao com criterio, rastreio e operacao financeira organizada.",
    summary:
      "Curso pratico para estruturar uma frente de afiliacao com aprovacao, comissao e acompanhamento de performance.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    producerName: "Equipe Comercial da Plataforma",
    category: "Aquisicao e Afiliacao",
    audience: "Gestores comerciais, afiliados e times de growth",
    transformation:
      "Sair de uma afiliacao sem controle para um programa com governanca, incentivos e leitura de resultados.",
    offers: [
      {
        id: "offer-affiliate-once",
        title: "Programa completo",
        description: "Acesso avulso ao programa com playbooks e materiais.",
        priceLabel: "R$ 597,00",
        priceInCents: 59700,
        billingModel: "one_time"
      }
    ],
    modules: [
      {
        id: "module-affiliate-1",
        title: "Estrutura de governanca",
        description: "Regras, onboarding e aprovacao.",
        lessons: [
          {
            id: "lesson-affiliate-1",
            slug: "criterios-de-aprovacao",
            title: "Criterios de aprovacao",
            summary: "Como proteger marca, margem e reputacao.",
            isPreview: true,
            dripAfterDays: 0,
            video: {
              videoProvider: "panda",
              externalVideoId: "pv_003",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_003",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 760,
              captionsUrl: null
            },
            assets: []
          }
        ]
      }
    ]
  }
];

export const demoTestimonials = [
  {
    name: "Marina Costa",
    role: "Operacao academica",
    quote:
      "A plataforma organiza a experiencia do aluno sem parecer uma ferramenta genérica. Tudo transmite produto serio."
  },
  {
    name: "Rafael Nunes",
    role: "Produtor convidado",
    quote:
      "A combinacao entre pagina de oferta, studio e leitura de vendas deixa o fluxo mais profissional do que uma soma de ferramentas."
  }
];

export const demoHomeMetrics: DashboardMetric[] = [
  {
    label: "Cursos ativos",
    value: "12",
    note: "catalogo com ofertas de compra avulsa e recorrente"
  },
  {
    label: "Produtores em revisao",
    value: "4",
    note: "pipeline controlado para entrada de novos especialistas"
  },
  {
    label: "Afiliados aprovados",
    value: "28",
    note: "operacao com rastreio, comissao e acompanhamento"
  }
];

export const demoAdminQueue: ApprovalQueueItem[] = [
  {
    id: "approval-producer-001",
    kind: "producer",
    displayName: "Camila Freitas",
    state: "pending_review",
    note: "aguardando validacao de payout e portifolio"
  },
  {
    id: "approval-affiliate-014",
    kind: "affiliate",
    displayName: "Carlos Ventura",
    state: "needs_adjustment",
    note: "ajustar pagina de divulgacao e politica de anuncio"
  }
];
