import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

type ApprovalState = "pending_review" | "approved" | "needs_adjustment";
type Role = "super_admin" | "platform_admin" | "producer" | "affiliate" | "student" | "support";
type VideoProvider = "panda" | "youtube";
type CourseStatus = "publicado" | "rascunho";
type CourseModality = "Online" | "Presencial" | "Hibrido";

interface DemoOffer {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  priceInCents: number;
  billingModel: "one_time" | "subscription";
}

interface DemoLesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  dripAfterDays: number;
  isPreview: boolean;
  videoProvider: VideoProvider;
  externalVideoId: string;
  embedUrl: string;
  allowedDomains: string[];
  durationSec: number;
  captionsUrl?: string | null;
}

interface DemoModule {
  id: string;
  title: string;
  description: string;
  lessons: DemoLesson[];
}

interface DemoCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description: string;
  summary: string;
  thumbnailUrl: string;
  producerName: string;
  instructor: string;
  audience: string;
  workload: string;
  modality: CourseModality;
  seats: number;
  schedule: Array<{ week: string; topic: string }>;
  materials: Array<{ name: string; type: string }>;
  status: CourseStatus;
  offers: DemoOffer[];
  modules: DemoModule[];
}

interface DemoUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export class DemoStoreService {
  private readonly roleRoute: Record<Role, string> = {
    super_admin: "/admin",
    platform_admin: "/admin",
    producer: "/studio",
    affiliate: "/affiliate",
    student: "/learning",
    support: "/admin"
  };

  private readonly courses: DemoCourse[] = [
    {
      id: "course-premium-ops",
      slug: "operacao-premium-de-cursos",
      title: "Operacao Premium de Cursos",
      subtitle: "Produto, oferta, onboarding e experiencia do aluno sob a mesma operacao.",
      excerpt: "Da oferta ao acompanhamento do aluno com uma arquitetura premium de produto digital.",
      description:
        "Programa desenhado para estruturar uma operacao completa de cursos com narrativa comercial, member area, governanca e acompanhamento de experiencia.",
      summary:
        "Curso estruturado para transformar conteudo em um produto digital premium com governanca, acompanhamento e margem protegida.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      producerName: "Equipe Plataforma de Aulas",
      instructor: "Operacao Plataforma",
      audience: "Times de operacao, especialistas e produtores",
      workload: "28h",
      modality: "Hibrido",
      seats: 32,
      schedule: [
        { week: "Modulo 1", topic: "Oferta, promessa e narrativa comercial" },
        { week: "Modulo 2", topic: "Checkout, onboarding e member area" },
        { week: "Modulo 3", topic: "Retencao, progresso e indicadores" }
      ],
      materials: [
        { name: "Blueprint da jornada do aluno", type: "PDF" },
        { name: "Checklist de go-live da operacao", type: "XLSX" }
      ],
      status: "publicado",
      offers: [
        {
          id: "offer-premium-once",
          title: "Acesso completo",
          description: "Compra avulsa com trilha completa e certificado.",
          priceLabel: "R$ 897,00",
          priceInCents: 89700,
          billingModel: "one_time"
        },
        {
          id: "offer-premium-sub",
          title: "Ciclo mensal",
          description: "Recorrencia mensal com encontros e atualizacoes.",
          priceLabel: "R$ 197,00",
          priceInCents: 19700,
          billingModel: "subscription"
        }
      ],
      modules: [
        {
          id: "module-1",
          title: "Oferta e posicionamento",
          description: "Definicao de proposta, narrativa e valor percebido.",
          lessons: [
            {
              id: "lesson-1",
              slug: "diagnostico-da-oferta",
              title: "Diagnostico da oferta",
              summary: "Mapeamento de publico, promessa e diferencas do produto.",
              dripAfterDays: 0,
              isPreview: true,
              videoProvider: "panda",
              externalVideoId: "pv_001",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_001",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 1180,
              captionsUrl: "https://cdn.example.com/captions/pv_001.vtt"
            },
            {
              id: "lesson-2",
              slug: "pagina-e-checkout",
              title: "Pagina e checkout",
              summary: "Costura entre pagina de oferta, checkout e onboarding.",
              dripAfterDays: 1,
              isPreview: false,
              videoProvider: "youtube",
              externalVideoId: "dQw4w9WgXcQ",
              embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 960,
              captionsUrl: null
            }
          ]
        },
        {
          id: "module-2",
          title: "Entrega e retencao",
          description: "Progresso, checkpoints, certificados e recompra.",
          lessons: [
            {
              id: "lesson-3",
              slug: "ritmo-de-consumo",
              title: "Ritmo de consumo",
              summary: "Como desenhar uma experiencia que leva o aluno ate a aplicacao.",
              dripAfterDays: 3,
              isPreview: false,
              videoProvider: "panda",
              externalVideoId: "pv_002",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_002",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 1380,
              captionsUrl: null
            }
          ]
        }
      ]
    },
    {
      id: "course-entrepreneurship",
      slug: "fundamentos-do-empreendedorismo",
      title: "Fundamentos do Empreendedorismo",
      subtitle: "Da ideia ao primeiro cliente com clareza de proposta e tracao inicial.",
      excerpt: "Uma trilha pratica para sair da intuicao e construir um negocio com base real.",
      description:
        "Curso introdutorio para quem esta estruturando seu primeiro produto, oferta ou servico, com foco em validacao, posicionamento e primeiras vendas.",
      summary:
        "Programa intensivo voltado para descoberta de publico, validacao de oferta e execucao comercial inicial.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      producerName: "Equipe Academica",
      instructor: "Camila Andrade",
      audience: "Novos empreendedores e profissionais em transicao",
      workload: "32h",
      modality: "Hibrido",
      seats: 24,
      schedule: [
        { week: "Semana 1", topic: "Mentalidade, problema e publico" },
        { week: "Semana 2", topic: "Modelo de negocio e proposta de valor" },
        { week: "Semana 3", topic: "Validacao, MVP e aprendizado" },
        { week: "Semana 4", topic: "Primeiras vendas e indicadores" }
      ],
      materials: [
        { name: "Canvas comentado", type: "PDF" },
        { name: "Planilha de validacao", type: "XLSX" }
      ],
      status: "publicado",
      offers: [
        {
          id: "offer-entrepreneurship-once",
          title: "Turma completa",
          description: "Acesso integral a aulas, encontros e certificado.",
          priceLabel: "R$ 497,00",
          priceInCents: 49700,
          billingModel: "one_time"
        }
      ],
      modules: [
        {
          id: "module-entre-1",
          title: "Base do negocio",
          description: "Fundamentos para sair da ideia e entrar em construcao.",
          lessons: [
            {
              id: "lesson-entre-1",
              slug: "clareza-de-oferta",
              title: "Clareza de oferta",
              summary: "Como transformar conhecimento em proposta compreensivel e desejavel.",
              dripAfterDays: 0,
              isPreview: true,
              videoProvider: "youtube",
              externalVideoId: "dQw4w9WgXcQ",
              embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 840,
              captionsUrl: null
            }
          ]
        }
      ]
    },
    {
      id: "course-finance",
      slug: "gestao-financeira-essencial",
      title: "Gestao Financeira Essencial",
      subtitle: "Numeros claros para decisoes corajosas e sustentaveis.",
      excerpt: "Fluxo de caixa, margem e leitura financeira para pequenas operacoes.",
      description:
        "Capacitacao pratica para consolidar rotina financeira, precificacao e visao de indicadores sem depender de planilhas improvisadas.",
      summary:
        "Programa direto ao ponto para consolidar leitura financeira, margem e tomada de decisao em pequenos negocios.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      producerName: "Equipe Financeira",
      instructor: "Mariana Lopes",
      audience: "Empreendedores, gestores e operacao administrativa",
      workload: "16h",
      modality: "Presencial",
      seats: 20,
      schedule: [
        { week: "Encontro 1", topic: "Fluxo de caixa e DRE simplificado" },
        { week: "Encontro 2", topic: "Precificacao e margem" },
        { week: "Encontro 3", topic: "Indicadores e rotina de decisao" }
      ],
      materials: [{ name: "Planilha de gestao financeira", type: "XLSX" }],
      status: "publicado",
      offers: [
        {
          id: "offer-finance-once",
          title: "Imersao presencial",
          description: "Acesso as aulas presenciais com materiais e suporte.",
          priceLabel: "R$ 397,00",
          priceInCents: 39700,
          billingModel: "one_time"
        }
      ],
      modules: [
        {
          id: "module-fin-1",
          title: "Fundamentos financeiros",
          description: "Base para organizar caixa, margem e previsao.",
          lessons: [
            {
              id: "lesson-fin-1",
              slug: "caixa-sem-caos",
              title: "Caixa sem caos",
              summary: "Como estruturar entradas, saidas e leitura de saldo com criterio.",
              dripAfterDays: 0,
              isPreview: true,
              videoProvider: "panda",
              externalVideoId: "pv_004",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_004",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 920,
              captionsUrl: null
            }
          ]
        }
      ]
    },
    {
      id: "course-affiliates",
      slug: "maquina-de-afiliacao-com-governanca",
      title: "Maquina de Afiliacao com Governanca",
      subtitle: "Aquisicao com criterio, rastreio e leitura financeira.",
      excerpt: "Afiliacao com processo, rastreio e seguranca de marca.",
      description:
        "Curso voltado para a criacao de uma operacao de afiliacao com criterios de aprovacao, links rastreaveis, leitura financeira e protecao comercial.",
      summary:
        "Programa voltado para a criacao de uma operacao de afiliacao com aprovacao, links rastreaveis e acompanhamento de comissao.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      producerName: "Equipe Comercial",
      instructor: "Carlos Ventura",
      audience: "Gestores comerciais, afiliados e times de growth",
      workload: "18h",
      modality: "Online",
      seats: 40,
      schedule: [
        { week: "Modulo 1", topic: "Governanca, regras e filtros de entrada" },
        { week: "Modulo 2", topic: "Links, comissoes e acompanhamento" },
        { week: "Modulo 3", topic: "Escala sem perder criterio" }
      ],
      materials: [
        { name: "Playbook de aprovacao de afiliados", type: "PDF" },
        { name: "Modelo de acompanhamento de campanha", type: "XLSX" }
      ],
      status: "rascunho",
      offers: [
        {
          id: "offer-affiliate-once",
          title: "Programa completo",
          description: "Acesso avulso ao playbook completo.",
          priceLabel: "R$ 597,00",
          priceInCents: 59700,
          billingModel: "one_time"
        }
      ],
      modules: [
        {
          id: "module-aff-1",
          title: "Governanca",
          description: "Regras, filtros e protecao de marca.",
          lessons: [
            {
              id: "lesson-aff-1",
              slug: "criterios-de-aprovacao",
              title: "Criterios de aprovacao",
              summary: "Como desenhar um processo de entrada sem bagunca.",
              dripAfterDays: 0,
              isPreview: true,
              videoProvider: "panda",
              externalVideoId: "pv_003",
              embedUrl: "https://player.pandavideo.com.br/embed/?v=pv_003",
              allowedDomains: ["aulas.abasolucoesetecnologia.com.br", "localhost"],
              durationSec: 740,
              captionsUrl: null
            }
          ]
        }
      ]
    }
  ];

  private readonly homeMetrics = [
    { label: "Cursos ativos", value: "12", note: "catalogo com modelos avulso e recorrente" },
    { label: "Produtores em revisao", value: "4", note: "pipeline com aprovacao operacional" },
    { label: "Afiliados aprovados", value: "28", note: "links e comissoes rastreaveis" }
  ];

  private readonly testimonials = [
    {
      name: "Marina Costa",
      role: "Operacao academica",
      quote:
        "A plataforma organiza pagina, member area e bastidores sem parecer um conjunto solto de ferramentas."
    },
    {
      name: "Rafael Nunes",
      role: "Produtor convidado",
      quote: "O fluxo entre studio, oferta e acompanhamento deixa o produto com cara de software premium."
    }
  ];

  private approvals = [
    {
      id: "approval-producer-001",
      kind: "producer" as const,
      displayName: "Camila Freitas",
      state: "pending_review" as ApprovalState,
      note: "validar payout e portfolio"
    },
    {
      id: "approval-affiliate-014",
      kind: "affiliate" as const,
      displayName: "Carlos Ventura",
      state: "needs_adjustment" as ApprovalState,
      note: "ajustar pagina de divulgacao"
    }
  ];

  private progressByLesson = new Map<string, number>([
    ["lesson-1", 100],
    ["lesson-2", 64],
    ["lesson-3", 0]
  ]);

  private checkoutEvents: Array<Record<string, unknown>> = [];
  private webhookEvents: Array<Record<string, unknown>> = [];
  private readonly users = new Map<string, DemoUser>([
    [
      "aluno@plataforma.local",
      {
        fullName: "Aluno Demo",
        email: "aluno@plataforma.local",
        password: "premium123",
        role: "student"
      }
    ],
    [
      "produtor@plataforma.local",
      {
        fullName: "Camila Freitas",
        email: "produtor@plataforma.local",
        password: "premium123",
        role: "producer"
      }
    ],
    [
      "afiliado@plataforma.local",
      {
        fullName: "Carlos Ventura",
        email: "afiliado@plataforma.local",
        password: "premium123",
        role: "affiliate"
      }
    ],
    [
      "admin@plataforma.local",
      {
        fullName: "Operacao Plataforma",
        email: "admin@plataforma.local",
        password: "premium123",
        role: "platform_admin"
      }
    ],
    [
      "suporte@plataforma.local",
      {
        fullName: "Suporte Interno",
        email: "suporte@plataforma.local",
        password: "premium123",
        role: "support"
      }
    ]
  ]);

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  getHome() {
    return {
      hero: {
        title: "Plataforma proprietaria de aulas com operacao premium",
        subtitle:
          "Catalogo, checkout, area do aluno, studio, afiliacao e administracao em uma estrutura unica."
      },
      metrics: this.homeMetrics,
      featuredCourses: this.listCourses().filter((course) => course.status === "publicado"),
      testimonials: this.testimonials
    };
  }

  listCourses() {
    return this.courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      excerpt: course.excerpt,
      description: course.description,
      summary: course.summary,
      thumbnailUrl: course.thumbnailUrl,
      producerName: course.producerName,
      instructor: course.instructor,
      audience: course.audience,
      workload: course.workload,
      modality: course.modality,
      seats: course.seats,
      schedule: course.schedule,
      materials: course.materials,
      status: course.status,
      offers: course.offers
    }));
  }

  getCourse(slug: string) {
    const course = this.courses.find((item) => item.slug === slug);
    if (!course) {
      throw new NotFoundException(`Curso '${slug}' nao encontrado`);
    }

    return {
      ...course,
      lessonCount: course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
      totalDurationSec: course.modules.flatMap((module) => module.lessons).reduce((acc, lesson) => acc + lesson.durationSec, 0)
    };
  }

  getCheckoutOffer(offerId: string) {
    const course = this.courses.find((item) => item.offers.some((offer) => offer.id === offerId));
    if (!course) {
      throw new NotFoundException(`Oferta '${offerId}' nao encontrada`);
    }

    const offer = course.offers.find((item) => item.id === offerId);
    if (!offer) {
      throw new NotFoundException(`Oferta '${offerId}' nao encontrada`);
    }

    return {
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        summary: course.summary,
        thumbnailUrl: course.thumbnailUrl,
        producerName: course.producerName,
        audience: course.audience
      },
      offer
    };
  }

  register(input: { fullName: string; email: string; password: string }) {
    const normalizedEmail = this.normalizeEmail(input.email);

    if (this.users.has(normalizedEmail)) {
      throw new ConflictException("Ja existe uma conta com este e-mail.");
    }

    const user: DemoUser = {
      fullName: input.fullName.trim(),
      email: normalizedEmail,
      password: input.password,
      role: "student"
    };

    this.users.set(normalizedEmail, user);

    return {
      message: "Cadastro concluido com acesso padrao de aluno.",
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role
      },
      nextRoute: this.roleRoute[user.role]
    };
  }

  login(input: { email: string; password: string }) {
    const normalizedEmail = this.normalizeEmail(input.email);
    const user = this.users.get(normalizedEmail);

    if (!user || user.password !== input.password) {
      throw new UnauthorizedException("E-mail ou senha invalidos.");
    }

    return {
      message: "Login realizado com sucesso.",
      session: {
        token: `demo.${user.role}.${Date.now()}`,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        nextRoute: this.roleRoute[user.role]
      }
    };
  }

  getCurrentUser() {
    const adminUser = this.users.get("admin@plataforma.local");

    return {
      fullName: adminUser?.fullName ?? "Operacao Plataforma",
      email: adminUser?.email ?? "admin@plataforma.local",
      role: adminUser?.role ?? "platform_admin",
      route: this.roleRoute.platform_admin
    };
  }

  getLearningOverview() {
    const course = this.courses[0];
    if (!course) {
      return {
        enrolledCourses: [],
        certificatesReady: 0
      };
    }
    const lessons = course.modules.flatMap((module) => module.lessons);
    const completion = Math.round(
      lessons.reduce((acc, lesson) => acc + (this.progressByLesson.get(lesson.id) ?? 0), 0) /
        (lessons.length * 100)
    );

    return {
      enrolledCourses: [
        {
          slug: course.slug,
          title: course.title,
          completionPct: completion,
          nextLesson:
            lessons.find((lesson) => (this.progressByLesson.get(lesson.id) ?? 0) < 100)?.title ?? lessons[0]?.title
        }
      ],
      certificatesReady: completion >= 100 ? 1 : 0
    };
  }

  getLearningCourse(slug: string) {
    const course = this.getCourse(slug);
    return {
      ...course,
      progress: course.modules.map((module) => ({
        moduleId: module.id,
        title: module.title,
        lessons: module.lessons.map((lesson) => ({
          lessonId: lesson.id,
          title: lesson.title,
          watchedPct: this.progressByLesson.get(lesson.id) ?? 0
        }))
      }))
    };
  }

  updateLessonProgress(input: { lessonId: string; watchedPct: number }) {
    this.progressByLesson.set(input.lessonId, Math.max(0, Math.min(input.watchedPct, 100)));
    return {
      lessonId: input.lessonId,
      watchedPct: this.progressByLesson.get(input.lessonId),
      updatedAt: new Date().toISOString()
    };
  }

  getStudioOverview() {
    return {
      kpis: [
        { label: "Cursos publicados", value: "7", note: "com pagina, oferta e member area" },
        { label: "Conversao media", value: "4.8%", note: "ofertas com checkout sandbox-first" },
        { label: "Receita projetada", value: "R$ 38.400", note: "baseado nas ofertas ativas" }
      ],
      pipeline: [
        { title: "Curso de onboarding", state: "pending_review" },
        { title: "Workshop de operacao", state: "approved" }
      ]
    };
  }

  submitProducerApplication(input: { fullName: string; email: string; portfolioUrl: string }) {
    const application = {
      id: `approval-producer-${this.approvals.length + 1}`.padStart(20, "0"),
      kind: "producer" as const,
      displayName: input.fullName,
      state: "pending_review" as ApprovalState,
      note: `portfolio recebido: ${input.portfolioUrl}`
    };
    this.approvals.unshift(application);
    return {
      message: "Solicitacao de produtor registrada",
      application
    };
  }

  createStudioCourse(input: { title: string; summary: string }) {
    return {
      message: "Curso criado em modo rascunho",
      draft: {
        id: `draft-${Date.now()}`,
        title: input.title,
        summary: input.summary,
        status: "draft"
      }
    };
  }

  getAffiliateOverview() {
    return {
      kpis: [
        { label: "Cliques qualificados", value: "2.148", note: "links rastreados por campanha" },
        { label: "Comissao pendente", value: "R$ 2.340", note: "aguardando liquidacao sandbox-first" },
        { label: "Conversao", value: "3.2%", note: "media entre ofertas publicadas" }
      ],
      links: [
        { slug: "camila-premium", destination: "/catalog/operacao-premium-de-cursos", status: "active" },
        { slug: "carlos-afiliacao", destination: "/catalog/maquina-de-afiliacao-com-governanca", status: "active" }
      ]
    };
  }

  submitAffiliateApplication(input: { fullName: string; email: string; channelUrl: string }) {
    const application = {
      id: `approval-affiliate-${this.approvals.length + 1}`.padStart(20, "0"),
      kind: "affiliate" as const,
      displayName: input.fullName,
      state: "pending_review" as ApprovalState,
      note: `canal informado: ${input.channelUrl}`
    };
    this.approvals.unshift(application);
    return {
      message: "Solicitacao de afiliado registrada",
      application
    };
  }

  getAdminOverview() {
    return {
      approvals: this.approvals,
      summary: {
        totalCourses: this.courses.length,
        activeCourses: this.courses.filter((course) => course.status === "publicado").length,
        pendingApprovals: this.approvals.filter((item) => item.state !== "approved").length
      },
      health: {
        paymentsMode: "sandbox-first",
        videoProviders: ["panda", "youtube"],
        stagingDomain: "aulas.abasolucoesetecnologia.com.br"
      },
      finance: {
        lastCheckoutCount: this.checkoutEvents.length,
        webhookEventsReceived: this.webhookEvents.length
      },
      recentActivity: [
        {
          who: "Camila Freitas",
          what: "aguarda aprovacao de perfil",
          target: "produtor",
          when: "ha 2h"
        },
        {
          who: "Carlos Ventura",
          what: "ajustou a aplicacao",
          target: "afiliado",
          when: "ha 5h"
        },
        {
          who: "Checkout sandbox",
          what: "registrou sessao",
          target: `${this.checkoutEvents.length} operacoes`,
          when: "hoje"
        },
        {
          who: "Webhooks Asaas",
          what: "receberam eventos",
          target: `${this.webhookEvents.length} payloads`,
          when: "hoje"
        }
      ],
      shortcuts: [
        { label: "Novo evento", to: "/admin/eventos" },
        { label: "Novo curso", to: "/admin/cursos" },
        { label: "Aprovar negocios", to: "/admin/comunidade" },
        { label: "Editar homepage", to: "/admin/paginas" }
      ]
    };
  }

  listApprovals() {
    return this.approvals;
  }

  approveApplication(applicationId: string, notes?: string) {
    const approval = this.approvals.find((item) => item.id === applicationId);
    if (!approval) {
      throw new NotFoundException(`Fila '${applicationId}' nao encontrada`);
    }

    approval.state = "approved";
    approval.note = notes?.trim() || "aprovado pelo painel administrativo";

    return {
      message: "Aprovacao registrada",
      approval
    };
  }

  createCheckoutSession(input: {
    offerId: string;
    buyerName: string;
    buyerEmail: string;
    affiliateCode?: string;
  }) {
    const course = this.courses.find((item) => item.offers.some((offer) => offer.id === input.offerId));
    if (!course) {
      throw new NotFoundException(`Oferta '${input.offerId}' nao encontrada`);
    }
    const offer = course.offers.find((item) => item.id === input.offerId);
    if (!offer) {
      throw new NotFoundException(`Oferta '${input.offerId}' nao encontrada`);
    }

    const session = {
      checkoutId: `chk_${Date.now()}`,
      status: "created",
      mode: "sandbox-first",
      provider: "asaas",
      splitPrepared: true,
      course: {
        slug: course.slug,
        title: course.title
      },
      offer,
      buyer: {
        name: input.buyerName,
        email: input.buyerEmail
      },
      affiliateCode: input.affiliateCode ?? null,
      urls: {
        checkout: `/checkout/${offer.id}`,
        success: `/learning/${course.slug}`
      }
    };

    this.checkoutEvents.unshift(session);
    return session;
  }

  recordAsaasWebhook(payload: Record<string, unknown>) {
    const event = {
      receivedAt: new Date().toISOString(),
      provider: "asaas",
      payload
    };
    this.webhookEvents.unshift(event);
    return {
      message: "Webhook registrado em modo sandbox-first",
      event
    };
  }
}
