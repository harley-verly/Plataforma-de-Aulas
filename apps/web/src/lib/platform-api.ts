const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/$/, "");

export type PlatformOffer = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  priceInCents: number;
  billingModel: "one_time" | "subscription";
};

export type PlatformCourse = {
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
  modality: string;
  seats: number;
  schedule: Array<{ week: string; topic: string }>;
  materials: Array<{ name: string; type: string }>;
  status: "publicado" | "rascunho";
  offers: PlatformOffer[];
};

export type PlatformCourseDetail = PlatformCourse & {
  modules: Array<{
    id: string;
    title: string;
    description: string;
    lessons: Array<{
      id: string;
      slug: string;
      title: string;
      summary: string;
      dripAfterDays: number;
      isPreview: boolean;
      videoProvider: "panda" | "youtube";
      externalVideoId: string;
      embedUrl: string;
      allowedDomains: string[];
      durationSec: number;
      captionsUrl?: string | null;
    }>;
  }>;
  lessonCount: number;
  totalDurationSec: number;
};

export type PlatformCatalogHome = {
  hero: {
    title: string;
    subtitle: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  featuredCourses: PlatformCourse[];
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
  }>;
};

export type PlatformAdminOverview = {
  approvals: Array<{
    id: string;
    kind: "producer" | "affiliate";
    displayName: string;
    state: "pending_review" | "approved" | "needs_adjustment";
    note: string;
  }>;
  summary: {
    totalCourses: number;
    activeCourses: number;
    pendingApprovals: number;
  };
  health: {
    paymentsMode: string;
    videoProviders: string[];
    stagingDomain: string;
  };
  finance: {
    lastCheckoutCount: number;
    webhookEventsReceived: number;
  };
  recentActivity: Array<{
    who: string;
    what: string;
    target: string;
    when: string;
  }>;
  shortcuts: Array<{
    label: string;
    to: string;
  }>;
};

export type CommercialPresentationAccessPayload = {
  name: string;
  email: string;
  phone: string;
  currentChapterId: string;
  currentChapterTitle: string;
  activeTierId: "24h" | "48h" | "72h";
  activeTierLabel: string;
  activePriceInCents: number;
  landingPath: string;
};

export type CommercialPresentationAccessResponse = {
  status: "ok";
  crm: "portal-de-leads";
  intake: "plataforma-de-aulas";
  capturedAt: number;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function postJson<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { message?: string | string[] };
      const errorMessage = Array.isArray(errorPayload.message)
        ? errorPayload.message.join(", ")
        : errorPayload.message;

      if (errorMessage) {
        message = errorMessage;
      }
    } catch {
      // Keep the generic message when the API does not return JSON.
    }

    throw new Error(message);
  }

  return (await response.json()) as TResponse;
}

export function getCatalogHome() {
  return fetchJson<PlatformCatalogHome>("/catalog/home");
}

export function getCatalogCourses() {
  return fetchJson<PlatformCourse[]>("/catalog/courses");
}

export function getCatalogCourse(slug: string) {
  return fetchJson<PlatformCourseDetail>(`/catalog/courses/${slug}`);
}

export function getAdminOverview() {
  return fetchJson<PlatformAdminOverview>("/admin/overview");
}

export function captureCommercialPresentationLead(body: CommercialPresentationAccessPayload) {
  return postJson<CommercialPresentationAccessResponse, CommercialPresentationAccessPayload>(
    "/commercial/presentation/access",
    body
  );
}
