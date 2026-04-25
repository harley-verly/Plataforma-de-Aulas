import chapterAdminCourses from "@/assets/presentation/chapter-admin-courses.png";
import chapterAdminDashboard from "@/assets/presentation/chapter-admin-dashboard.png";
import chapterAdminMedia from "@/assets/presentation/chapter-admin-media.png";
import chapterCommunity from "@/assets/presentation/chapter-community.png";
import chapterCourseDetail from "@/assets/presentation/chapter-course-detail.png";
import chapterCourses from "@/assets/presentation/chapter-courses.png";
import chapterHome from "@/assets/presentation/chapter-home.png";
import { PresentationChapter } from "@/lib/commercial-presentation";

export const PRESENTATION_CHAPTERS: PresentationChapter[] = [
  {
    id: "visao-geral",
    eyebrow: "Capitulo 01",
    title: "Visao geral do projeto e proposta de valor",
    summary: "Uma plataforma proprietaria para vender, organizar e operar cursos com identidade propria.",
    description:
      "Esta apresentacao mostra o que ja esta vivo no demo e como essa mesma base pode ser transformada no produto final contratado, com acabamento comercial, governanca e experiencia premium.",
    features: [
      "Base visual premium pronta para ser apresentada ao cliente final",
      "Estrutura separada entre experiencia publica e area operacional",
      "Projeto pensado para evoluir sem ficar preso a uma ferramenta de terceiro",
      "Rota comercial independente, facil de acoplar e desacoplar da base"
    ],
    screenshot: chapterHome,
    liveDemoUrl: "/",
    ctaLabel: "Ver homepage ao vivo"
  },
  {
    id: "experiencia-publica",
    eyebrow: "Capitulo 02",
    title: "Experiencia publica e primeira impressao",
    summary: "A fachada do produto trabalha posicionamento, navegacao e percepcao de autoridade desde a primeira dobra.",
    description:
      "O visitante encontra uma vitrine clara, com narrativa forte, secoes publicas bem organizadas e pontos de entrada para descoberta, curso, contato e apresentacao institucional.",
    features: [
      "Navegacao publica elegante e coerente com a proposta premium",
      "Paginas pensadas para apresentar conteudo, marca e autoridade",
      "Experiencia que pode receber branding, copy e ajustes comerciais do cliente",
      "Estrutura pronta para abrir prova social, CTA e captacao de interesse"
    ],
    screenshot: chapterCommunity,
    liveDemoUrl: "/comunidade",
    ctaLabel: "Ver experiencia publica"
  },
  {
    id: "catalogo-e-cursos",
    eyebrow: "Capitulo 03",
    title: "Catalogo e paginas de curso",
    summary: "A navegacao de cursos ja mostra listagem, detalhe de produto e consumo de conteudo de forma organizada.",
    description:
      "O site ja apresenta o catalogo, os cards de cursos e a pagina individual de curso como uma base comercial consistente para ofertas, trilhas e futuras conversoes.",
    features: [
      "Pagina de cursos com leitura comercial imediata",
      "Detalhe individual de curso com estrutura para oferta e cronograma",
      "Consumo visual coerente entre vitrine e produto",
      "Dados do catalogo ja conectados ao backend do demo"
    ],
    screenshot: chapterCourses,
    liveDemoUrl: "/cursos",
    ctaLabel: "Ver catalogo ao vivo"
  },
  {
    id: "painel-e-operacao",
    eyebrow: "Capitulo 04",
    title: "Painel administrativo e operacao",
    summary: "A area interna ja demonstra como a operacao pode acompanhar saude do portal, atalhos e rotinas centrais.",
    description:
      "O painel administrativo foi desenhado para transmitir controle operacional, leitura executiva e facilidade de acesso aos modulos mais importantes do produto.",
    features: [
      "Visao geral administrativa com indicadores e atalhos",
      "Navegacao interna consistente entre modulos de operacao",
      "Leitura premium para gestao de conteudo, cursos e midia",
      "Base pronta para crescer com workflows mais profundos"
    ],
    screenshot: chapterAdminDashboard,
    liveDemoUrl: "/admin",
    ctaLabel: "Ver painel ao vivo"
  },
  {
    id: "demo-atual",
    eyebrow: "Capitulo 05",
    title: "O que ja existe no demo hoje",
    summary: "A fase inicial de demonstracao ja permite apresentar o produto com mais do que uma landing estatica.",
    description:
      "Hoje o demo ja mostra fachada publica, catalogo, detalhe de curso, area administrativa e dados conectados ao backend nas rotas principais. Ou seja: a venda parte de algo tangivel, nao apenas de promessa.",
    features: [
      "Homepage e experiencia publica publicadas no staging",
      "Catalogo e pagina de curso consumindo dados reais do backend",
      "Admin overview e grade de cursos alimentados por API",
      "Assets, tema e navegacao ja consolidados como base oficial"
    ],
    screenshot: chapterAdminCourses,
    liveDemoUrl: "/admin/cursos",
    ctaLabel: "Ver demo atual"
  },
  {
    id: "entrega-final",
    eyebrow: "Capitulo 06",
    title: "O que sera entregue na versao contratada",
    summary: "A contratacao leva o projeto da demo validada para uma versao beta funcional e, depois, para a fase final refinada.",
    description:
      "A entrega prevista cobre refinamento visual, customizacao do cliente, consolidacao das telas-chave e periodo de testes com acompanhamento pos-compra conforme a faixa comercial ativa.",
    features: [
      "Versao beta entregue dentro da janela definida na proposta",
      "Rodada de testes e customizacao para amadurecer o produto",
      "Acompanhamento pos-compra para cobrir erros e bugs da fase inicial",
      "Base pronta para seguir como produto proprietario do cliente"
    ],
    screenshot: chapterAdminMedia
  },
  {
    id: "condicoes-comerciais",
    eyebrow: "Capitulo 07",
    title: "Condicoes comerciais e proximo passo",
    summary: "A proposta combina urgencia comercial, cronograma claro e suporte pos-compra para acelerar a decisao.",
    description:
      "As condicoes abaixo sao calculadas por navegador para preservar a janela comercial desde a primeira visita. Quando a fase promocional termina, a proposta continua visivel em valor cheio neste mesmo computador.",
    features: [
      "24h com maior desconto e menor prazo de beta",
      "48h com faixa intermediaria de investimento e entrega",
      "72h com proposta padrao e cronograma mais amplo",
      "Contato direto por WhatsApp para fechamento rapido por PIX"
    ],
    screenshot: chapterCourseDetail,
    liveDemoUrl: "/cursos/operacao-premium-de-cursos",
    ctaLabel: "Rever a pagina de curso"
  }
];
