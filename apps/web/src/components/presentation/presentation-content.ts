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
    eyebrow: "Posicionamento do produto",
    title: "Uma plataforma proprietária para transformar cursos em marca, experiência e receita.",
    summary:
      "Aqui, o cliente não compra apenas telas bonitas: compra um produto digital capaz de organizar a operação, valorizar a percepção da marca e sustentar crescimento.",
    description:
      "A Plataforma de Aulas foi pensada para unir vitrine comercial, experiência do aluno e retaguarda operacional em um mesmo ecossistema. O resultado é um produto com cara de marca forte, não de solução improvisada.",
    features: [
      "Marca própria, visual premium e autoridade percebida desde o primeiro acesso",
      "Estrutura pensada para vender, entregar conteúdo e operar sem remendos",
      "Experiência mais forte para aluno, equipe interna e gestão em uma única base",
      "Projeto preparado para crescer como ativo digital do cliente, e não como ferramenta descartável"
    ],
    screenshot: chapterHome,
    liveDemoUrl: "/",
    ctaLabel: "Abrir homepage da plataforma"
  },
  {
    id: "experiencia-publica",
    eyebrow: "Primeira impressão que converte",
    title: "A fachada pública foi desenhada para gerar confiança antes mesmo da matrícula.",
    summary:
      "Uma apresentação forte aumenta o valor percebido do curso, transmite autoridade e afasta a sensação de estar diante de um software genérico.",
    description:
      "Quando a vitrine é bem resolvida, a marca parece maior, o conteúdo parece mais valioso e a decisão de compra fica mais fácil. É essa camada que transforma visita em interesse real.",
    features: [
      "Visual editorial premium para posicionar a marca acima do padrão comum do mercado",
      "Navegação clara para conduzir o visitante do interesse à oferta",
      "Ambiente pronto para receber prova social, copy comercial e campanhas de aquisição",
      "Estrutura que comunica organização, seriedade e valor já na primeira dobra"
    ],
    screenshot: chapterCommunity,
    liveDemoUrl: "/comunidade",
    ctaLabel: "Abrir vitrine pública"
  },
  {
    id: "catalogo-e-cursos",
    eyebrow: "Oferta organizada para vender melhor",
    title: "Catálogo e páginas de curso preparados para transformar interesse em matrícula.",
    summary:
      "A plataforma organiza vitrine, detalhes do produto e consumo de conteúdo de forma coerente, valorizando a oferta sem dispersar a atenção.",
    description:
      "Em vez de confundir o usuário, o catálogo concentra o olhar no que importa: clareza da oferta, leitura rápida dos diferenciais e um caminho natural para a decisão.",
    features: [
      "Catálogo com leitura comercial imediata e foco em produtos que precisam vender",
      "Página de curso com espaço para narrativa, oferta, cronograma e autoridade",
      "Continuidade visual entre descoberta, avaliação e acesso ao conteúdo",
      "Base conectada ao backend para que a proposta parta de algo tangível"
    ],
    screenshot: chapterCourses,
    liveDemoUrl: "/cursos",
    ctaLabel: "Abrir catálogo"
  },
  {
    id: "painel-e-operacao",
    eyebrow: "Governança e controle",
    title: "Uma operação mais segura, mais clara e muito mais profissional.",
    summary:
      "O painel administrativo mostra que a plataforma não pensa só na vitrine: ela também cuida de gestão, leitura operacional e evolução do produto.",
    description:
      "Quem vende cursos precisa de mais do que um front bonito. Precisa de controle, visão executiva e facilidade para acompanhar conteúdo, rotinas e crescimento da operação.",
    features: [
      "Painel com leitura executiva para decisões mais rápidas",
      "Base pronta para evoluir com workflows, aprovações e gestão de conteúdo",
      "Navegação interna consistente para reduzir atrito no uso diário",
      "Experiência que transmite maturidade operacional ao cliente e à equipe"
    ],
    screenshot: chapterAdminDashboard,
    liveDemoUrl: "/admin",
    ctaLabel: "Abrir painel administrativo"
  },
  {
    id: "demo-atual",
    eyebrow: "Risco percebido menor",
    title: "A contratação parte de uma base viva, não de uma promessa em branco.",
    summary:
      "Hoje já existe uma demonstração funcional para apresentar o produto, validar a direção visual e reduzir a insegurança na decisão.",
    description:
      "Isso encurta o caminho entre proposta e execução. Em vez de vender apenas conceito, a apresentação mostra um ambiente que já respira o produto final.",
    features: [
      "Demonstração real já publicada e pronta para ser apresentada",
      "Rotas principais já conectadas ao backend nas áreas centrais",
      "Direção visual consolidada como base oficial do projeto",
      "Mais confiança para contratar, porque o ponto de partida já é concreto"
    ],
    screenshot: chapterAdminCourses,
    liveDemoUrl: "/admin/cursos",
    ctaLabel: "Ver demonstração atual"
  },
  {
    id: "entrega-final",
    eyebrow: "Transformação contratada",
    title: "A versão contratada leva o demo para um produto pronto para operar com confiança.",
    summary:
      "O contrato não entrega apenas acabamento visual: entrega consolidação da experiência, refinamento operacional e entrada assistida em produção.",
    description:
      "A próxima fase transforma a base validada em um produto maduro, com ajustes sob medida, rodadas de testes e suporte para que a implantação ganhe estabilidade e valor percebido.",
    features: [
      "Refinamento da experiência pública, interna e administrativa com padrão premium",
      "Customizações alinhadas à marca, à operação e às prioridades do cliente",
      "Rodada de testes para reduzir ruído e amadurecer a entrega final",
      "Acompanhamento pós-entrega para atravessar a fase inicial com mais segurança"
    ],
    screenshot: chapterAdminMedia
  },
  {
    id: "condicoes-comerciais",
    eyebrow: "Decisão, prazo e condição",
    title: "A proposta combina investimento, velocidade de entrega e acompanhamento pós-compra.",
    summary:
      "A janela comercial foi pensada para favorecer uma decisão mais rápida sem abrir mão de previsibilidade, qualidade de execução e suporte.",
    description:
      "Quanto mais cedo a contratação avança, melhor a condição de entrada e mais agressivo pode ser o cronograma de implantação. Isso cria vantagem real para quem decide no momento certo.",
    features: [
      "Desconto mais forte e beta mais curto para entrada imediata via PIX",
      "Faixas progressivas para preservar previsibilidade mesmo fora da primeira janela",
      "Prazo de fase final claramente definido, sem promessa vaga",
      "Período de acompanhamento pós-compra para dar segurança à implantação"
    ],
    screenshot: chapterCourseDetail,
    liveDemoUrl: "/cursos/operacao-premium-de-cursos",
    ctaLabel: "Ver página de curso"
  }
];
