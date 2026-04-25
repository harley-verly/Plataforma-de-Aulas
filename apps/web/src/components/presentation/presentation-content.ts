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
    eyebrow: "Capítulo 01",
    title: "Visão geral do projeto e proposta de valor",
    summary: "Uma plataforma proprietária para vender, organizar e operar cursos com identidade própria.",
    description:
      "Esta apresentação mostra o que já está vivo no demo e como essa mesma base pode ser transformada no produto final contratado, com acabamento comercial, governança e experiência premium.",
    features: [
      "Base visual premium pronta para ser apresentada ao cliente final",
      "Estrutura separada entre experiência pública e área operacional",
      "Projeto pensado para evoluir sem ficar preso a uma ferramenta de terceiro",
      "Rota comercial independente, fácil de acoplar e desacoplar da base"
    ],
    screenshot: chapterHome,
    liveDemoUrl: "/",
    ctaLabel: "Ver homepage ao vivo"
  },
  {
    id: "experiencia-publica",
    eyebrow: "Capítulo 02",
    title: "Experiência pública e primeira impressão",
    summary: "A fachada do produto trabalha posicionamento, navegação e percepção de autoridade desde a primeira dobra.",
    description:
      "O visitante encontra uma vitrine clara, com narrativa forte, seções públicas bem organizadas e pontos de entrada para descoberta, curso, contato e apresentação institucional.",
    features: [
      "Navegação pública elegante e coerente com a proposta premium",
      "Páginas pensadas para apresentar conteúdo, marca e autoridade",
      "Experiência que pode receber branding, copy e ajustes comerciais do cliente",
      "Estrutura pronta para abrir prova social, CTA e captação de interesse"
    ],
    screenshot: chapterCommunity,
    liveDemoUrl: "/comunidade",
    ctaLabel: "Ver experiência pública"
  },
  {
    id: "catalogo-e-cursos",
    eyebrow: "Capítulo 03",
    title: "Catálogo e páginas de curso",
    summary: "A navegação de cursos já mostra listagem, detalhe de produto e consumo de conteúdo de forma organizada.",
    description:
      "O site já apresenta o catálogo, os cards de cursos e a página individual de curso como uma base comercial consistente para ofertas, trilhas e futuras conversões.",
    features: [
      "Página de cursos com leitura comercial imediata",
      "Detalhe individual de curso com estrutura para oferta e cronograma",
      "Consumo visual coerente entre vitrine e produto",
      "Dados do catálogo já conectados ao backend do demo"
    ],
    screenshot: chapterCourses,
    liveDemoUrl: "/cursos",
    ctaLabel: "Ver catálogo ao vivo"
  },
  {
    id: "painel-e-operacao",
    eyebrow: "Capítulo 04",
    title: "Painel administrativo e operação",
    summary: "A área interna já demonstra como a operação pode acompanhar a saúde do portal, atalhos e rotinas centrais.",
    description:
      "O painel administrativo foi desenhado para transmitir controle operacional, leitura executiva e facilidade de acesso aos módulos mais importantes do produto.",
    features: [
      "Visão geral administrativa com indicadores e atalhos",
      "Navegação interna consistente entre módulos de operação",
      "Leitura premium para gestão de conteúdo, cursos e mídia",
      "Base pronta para crescer com workflows mais profundos"
    ],
    screenshot: chapterAdminDashboard,
    liveDemoUrl: "/admin",
    ctaLabel: "Ver painel ao vivo"
  },
  {
    id: "demo-atual",
    eyebrow: "Capítulo 05",
    title: "O que já existe no demo hoje",
    summary: "A fase inicial de demonstração já permite apresentar o produto com mais do que uma landing estática.",
    description:
      "Hoje o demo já mostra fachada pública, catálogo, detalhe de curso, área administrativa e dados conectados ao backend nas rotas principais. Ou seja: a venda parte de algo tangível, não apenas de promessa.",
    features: [
      "Homepage e experiência pública publicadas no staging",
      "Catálogo e página de curso consumindo dados reais do backend",
      "Admin overview e grade de cursos alimentados por API",
      "Assets, tema e navegação já consolidados como base oficial"
    ],
    screenshot: chapterAdminCourses,
    liveDemoUrl: "/admin/cursos",
    ctaLabel: "Ver demo atual"
  },
  {
    id: "entrega-final",
    eyebrow: "Capítulo 06",
    title: "O que será entregue na versão contratada",
    summary: "A contratação leva o projeto da demo validada para uma versão beta funcional e, depois, para a fase final refinada.",
    description:
      "A entrega prevista cobre refinamento visual, customização do cliente, consolidação das telas-chave e período de testes com acompanhamento pós-compra conforme a faixa comercial ativa.",
    features: [
      "Versão beta entregue dentro da janela definida na proposta",
      "Rodada de testes e customização para amadurecer o produto",
      "Acompanhamento pós-compra para cobrir erros e bugs da fase inicial",
      "Base pronta para seguir como produto proprietário do cliente"
    ],
    screenshot: chapterAdminMedia
  },
  {
    id: "condicoes-comerciais",
    eyebrow: "Capítulo 07",
    title: "Condições comerciais e próximo passo",
    summary: "A proposta combina urgência comercial, cronograma claro e suporte pós-compra para acelerar a decisão.",
    description:
      "As condições abaixo são calculadas por navegador para preservar a janela comercial desde a primeira visita. Quando a fase promocional termina, a proposta continua visível em valor cheio neste mesmo computador.",
    features: [
      "24h com maior desconto e menor prazo de beta",
      "48h com faixa intermediária de investimento e entrega",
      "72h com proposta padrão e cronograma mais amplo",
      "Contato direto por WhatsApp para fechamento rápido por PIX"
    ],
    screenshot: chapterCourseDetail,
    liveDemoUrl: "/cursos/operacao-premium-de-cursos",
    ctaLabel: "Rever a página de curso"
  }
];
