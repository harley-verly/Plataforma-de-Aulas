import {
  demoAdminQueue,
  demoCourses,
  demoHomeMetrics,
  demoTestimonials,
  type ApprovalQueueItem,
  type OfferBillingModel,
  type PlatformRole,
  type VideoProvider
} from "@plataforma/contracts";

const DEFAULT_SERVER_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";
const DEFAULT_CLIENT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export interface ApiOffer {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  priceInCents: number;
  billingModel: OfferBillingModel;
}

export interface ApiLesson {
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

export interface ApiCourseModule {
  id: string;
  title: string;
  description: string;
  lessons: ApiLesson[];
}

export interface ApiCourseSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  thumbnailUrl: string;
  producerName: string;
  audience: string;
  offers: ApiOffer[];
}

export interface ApiCourseDetail extends ApiCourseSummary {
  lessonCount: number;
  totalDurationSec: number;
  modules: ApiCourseModule[];
}

export interface LearningOverviewResponse {
  enrolledCourses: Array<{
    slug: string;
    title: string;
    completionPct: number;
    nextLesson?: string;
  }>;
  certificatesReady: number;
}

export interface LearningCourseResponse extends ApiCourseDetail {
  progress: Array<{
    moduleId: string;
    title: string;
    lessons: Array<{
      lessonId: string;
      title: string;
      watchedPct: number;
    }>;
  }>;
}

export interface StudioOverviewResponse {
  kpis: Array<{ label: string; value: string; note: string }>;
  pipeline: Array<{ title: string; state: string }>;
}

export interface AffiliateOverviewResponse {
  kpis: Array<{ label: string; value: string; note: string }>;
  links: Array<{ slug: string; destination: string; status: string }>;
}

export interface AdminOverviewResponse {
  approvals: ApprovalQueueItem[];
  health: {
    paymentsMode: string;
    videoProviders: string[];
    stagingDomain: string;
  };
  finance: {
    lastCheckoutCount: number;
    webhookEventsReceived: number;
  };
}

export interface AuthRegisterResponse {
  message: string;
  user: {
    fullName: string;
    email: string;
    role: PlatformRole;
  };
  nextRoute: string;
}

export interface AuthLoginResponse {
  message: string;
  session: {
    token: string;
    email: string;
    role: PlatformRole;
    nextRoute: string;
  };
}

export interface CheckoutOfferResponse {
  course: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    thumbnailUrl: string;
    producerName: string;
    audience: string;
  };
  offer: ApiOffer;
}

export interface CheckoutSessionResponse {
  checkoutId: string;
  status: string;
  mode: string;
  provider: string;
  splitPrepared: boolean;
  course: {
    slug: string;
    title: string;
  };
  offer: ApiOffer;
  buyer: {
    name: string;
    email: string;
  };
  affiliateCode: string | null;
  urls: {
    checkout: string;
    success: string;
  };
}

function normalizeBaseUrl(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getClientApiBaseUrl() {
  return normalizeBaseUrl(DEFAULT_CLIENT_API_BASE_URL);
}

function getServerApiBaseUrl() {
  return normalizeBaseUrl(DEFAULT_SERVER_API_BASE_URL);
}

function mapCourseToApiDetail(course: (typeof demoCourses)[number]): ApiCourseDetail {
  const modules = course.modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      dripAfterDays: lesson.dripAfterDays,
      isPreview: lesson.isPreview,
      videoProvider: lesson.video.videoProvider,
      externalVideoId: lesson.video.externalVideoId,
      embedUrl: lesson.video.embedUrl,
      allowedDomains: lesson.video.allowedDomains,
      durationSec: lesson.video.durationSec,
      captionsUrl: lesson.video.captionsUrl
    }))
  }));

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    summary: course.summary,
    thumbnailUrl: course.thumbnailUrl,
    producerName: course.producerName,
    audience: course.audience,
    offers: course.offers,
    modules,
    lessonCount: modules.reduce((acc, module) => acc + module.lessons.length, 0),
    totalDurationSec: modules.flatMap((module) => module.lessons).reduce((acc, lesson) => acc + lesson.durationSec, 0)
  };
}

function mapCourseToSummary(course: (typeof demoCourses)[number]): ApiCourseSummary {
  const detail = mapCourseToApiDetail(course);
  return {
    id: detail.id,
    slug: detail.slug,
    title: detail.title,
    subtitle: detail.subtitle,
    summary: detail.summary,
    thumbnailUrl: detail.thumbnailUrl,
    producerName: detail.producerName,
    audience: detail.audience,
    offers: detail.offers
  };
}

function getFallbackHome() {
  return {
    hero: {
      title: "Plataforma proprietaria de aulas com operacao premium",
      subtitle:
        "Catalogo, checkout, area do aluno, studio, afiliacao e administracao em uma estrutura unica."
    },
    metrics: demoHomeMetrics,
    featuredCourses: demoCourses.map((course) => mapCourseToSummary(course)),
    testimonials: demoTestimonials
  };
}

async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${getServerApiBaseUrl()}${path}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getHomeData() {
  return fetchApi("/catalog/home", getFallbackHome());
}

export async function getCatalogCourses() {
  return fetchApi<ApiCourseSummary[]>("/catalog/courses", demoCourses.map((course) => mapCourseToSummary(course)));
}

export async function getCourseDetails(slug: string) {
  const fallbackCourse = demoCourses.find((course) => course.slug === slug);
  if (!fallbackCourse) {
    return null;
  }

  return fetchApi<ApiCourseDetail>(`/catalog/courses/${slug}`, mapCourseToApiDetail(fallbackCourse));
}

export async function getLearningOverview() {
  const firstCourse = demoCourses[0];
  return fetchApi<LearningOverviewResponse>("/learning/overview", {
    enrolledCourses: firstCourse
      ? [
          {
            slug: firstCourse.slug,
            title: firstCourse.title,
            completionPct: 55,
            nextLesson: firstCourse.modules[0]?.lessons[1]?.title ?? firstCourse.modules[0]?.lessons[0]?.title
          }
        ]
      : [],
    certificatesReady: 0
  });
}

export async function getLearningCourse(slug: string) {
  const fallbackCourse = demoCourses.find((course) => course.slug === slug);
  if (!fallbackCourse) {
    return null;
  }

  return fetchApi<LearningCourseResponse>(`/learning/courses/${slug}`, {
    ...mapCourseToApiDetail(fallbackCourse),
    progress: fallbackCourse.modules.map((module) => ({
      moduleId: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson, index) => ({
        lessonId: lesson.id,
        title: lesson.title,
        watchedPct: index === 0 ? 100 : 0
      }))
    }))
  });
}

export async function getStudioOverview() {
  return fetchApi<StudioOverviewResponse>("/studio/overview", {
    kpis: [
      { label: "Cursos publicados", value: "7", note: "com pagina, oferta e member area" },
      { label: "Conversao media", value: "4.8%", note: "ofertas com checkout sandbox-first" },
      { label: "Receita projetada", value: "R$ 38.400", note: "baseado nas ofertas ativas" }
    ],
    pipeline: [
      { title: "Curso de onboarding", state: "pending_review" },
      { title: "Workshop de operacao", state: "approved" }
    ]
  });
}

export async function getAffiliateOverview() {
  return fetchApi<AffiliateOverviewResponse>("/affiliate/overview", {
    kpis: [
      { label: "Cliques qualificados", value: "2.148", note: "links rastreados por campanha" },
      { label: "Comissao pendente", value: "R$ 2.340", note: "aguardando liquidacao sandbox-first" },
      { label: "Conversao", value: "3.2%", note: "media entre ofertas publicadas" }
    ],
    links: [
      { slug: "camila-premium", destination: "/catalog/operacao-premium-de-cursos", status: "active" },
      { slug: "carlos-afiliacao", destination: "/catalog/maquina-de-afiliacao-com-governanca", status: "active" }
    ]
  });
}

export async function getAdminOverview() {
  return fetchApi<AdminOverviewResponse>("/admin/overview", {
    approvals: demoAdminQueue,
    health: {
      paymentsMode: "sandbox-first",
      videoProviders: ["panda", "youtube"],
      stagingDomain: "aulas.abasolucoesetecnologia.com.br"
    },
    finance: {
      lastCheckoutCount: 0,
      webhookEventsReceived: 0
    }
  });
}

export async function getAdminApprovals() {
  return fetchApi<ApprovalQueueItem[]>("/admin/approvals", demoAdminQueue);
}

export async function getCheckoutOffer(offerId: string) {
  const fallbackCourse = demoCourses.find((course) => course.offers.some((offer) => offer.id === offerId));
  const fallbackOffer = fallbackCourse?.offers.find((offer) => offer.id === offerId);
  if (!fallbackCourse || !fallbackOffer) {
    return null;
  }

  return fetchApi<CheckoutOfferResponse>(`/checkout/offers/${offerId}`, {
    course: {
      id: fallbackCourse.id,
      slug: fallbackCourse.slug,
      title: fallbackCourse.title,
      subtitle: fallbackCourse.subtitle,
      summary: fallbackCourse.summary,
      thumbnailUrl: fallbackCourse.thumbnailUrl,
      producerName: fallbackCourse.producerName,
      audience: fallbackCourse.audience
    },
    offer: fallbackOffer
  });
}
