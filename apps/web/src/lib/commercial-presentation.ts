export type PresentationChapter = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  screenshot: string;
  liveDemoUrl?: string;
  ctaLabel?: string;
};

export type CommercialOfferTier = {
  tierId: "24h" | "48h" | "72h";
  deadlineHours: number;
  priceOriginal: number;
  priceCurrent: number;
  betaDeliveryDays: number;
  finalDeliveryDays: number;
  supportDays: number;
  label: string;
};

export type ProposalProgressState = {
  startedAt: number;
  lastChapter: string;
  lastSeenAt: number;
  version: string;
};

export type PresentationAccessLead = {
  name: string;
  email: string;
  phone: string;
  capturedAt: number;
};

export type ActiveOfferState = {
  activeTier: CommercialOfferTier;
  remainingMs: number;
  offerExpired: boolean;
};

export const COMMERCIAL_PRESENTATION_VERSION = "2026-04-25-v2";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export const OFFER_COOKIE_KEYS = {
  startedAt: "plataforma_offer_started_at",
  lastChapter: "plataforma_offer_last_chapter",
  lastSeenAt: "plataforma_offer_last_seen_at",
  version: "plataforma_offer_version",
  accessLead: "plataforma_offer_access_lead"
} as const;

export const COMMERCIAL_OFFER_TIERS: CommercialOfferTier[] = [
  {
    tierId: "24h",
    deadlineHours: 24,
    priceOriginal: 2500000,
    priceCurrent: 2000000,
    betaDeliveryDays: 15,
    finalDeliveryDays: 30,
    supportDays: 90,
    label: "Condição de 24 horas"
  },
  {
    tierId: "48h",
    deadlineHours: 48,
    priceOriginal: 2500000,
    priceCurrent: 2200000,
    betaDeliveryDays: 30,
    finalDeliveryDays: 45,
    supportDays: 60,
    label: "Condição de 48 horas"
  },
  {
    tierId: "72h",
    deadlineHours: 72,
    priceOriginal: 2500000,
    priceCurrent: 2500000,
    betaDeliveryDays: 45,
    finalDeliveryDays: 60,
    supportDays: 30,
    label: "Condição padrão"
  }
];

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=")[1] ?? "") : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function isValidTimestamp(value: string | null) {
  if (!value) {
    return false;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

function getChapterIds(chapters: PresentationChapter[]) {
  return chapters.map((chapter) => chapter.id);
}

function resolveChapterId(chapters: PresentationChapter[], requestedChapterId: string | null, fallbackChapterId: string | null) {
  const firstChapter = chapters[0]?.id ?? "visao-geral";

  if (isValidChapterId(chapters, requestedChapterId)) {
    return requestedChapterId as string;
  }

  if (isValidChapterId(chapters, fallbackChapterId)) {
    return fallbackChapterId as string;
  }

  return firstChapter;
}

function isValidPresentationAccessLead(value: unknown): value is PresentationAccessLead {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<PresentationAccessLead>;

  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    typeof candidate.email === "string" &&
    candidate.email.includes("@") &&
    typeof candidate.phone === "string" &&
    candidate.phone.trim().length > 0 &&
    typeof candidate.capturedAt === "number" &&
    Number.isFinite(candidate.capturedAt) &&
    candidate.capturedAt > 0
  );
}

export function isValidChapterId(chapters: PresentationChapter[], chapterId: string | null) {
  return Boolean(chapterId && getChapterIds(chapters).includes(chapterId));
}

export function clearCommercialPresentationSession() {
  deleteCookie(OFFER_COOKIE_KEYS.startedAt);
  deleteCookie(OFFER_COOKIE_KEYS.lastChapter);
  deleteCookie(OFFER_COOKIE_KEYS.lastSeenAt);
  deleteCookie(OFFER_COOKIE_KEYS.version);
  deleteCookie(OFFER_COOKIE_KEYS.accessLead);
}

export function getSavedPresentationAccessLead() {
  const savedVersion = getCookie(OFFER_COOKIE_KEYS.version);

  if (savedVersion !== COMMERCIAL_PRESENTATION_VERSION) {
    clearCommercialPresentationSession();
    return null;
  }

  const rawLead = getCookie(OFFER_COOKIE_KEYS.accessLead);

  if (!rawLead) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawLead);

    if (!isValidPresentationAccessLead(parsed)) {
      clearCommercialPresentationSession();
      return null;
    }

    return parsed;
  } catch {
    clearCommercialPresentationSession();
    return null;
  }
}

export function persistPresentationAccessLead(lead: PresentationAccessLead) {
  setCookie(OFFER_COOKIE_KEYS.accessLead, JSON.stringify(lead));
  setCookie(OFFER_COOKIE_KEYS.version, COMMERCIAL_PRESENTATION_VERSION);
}

export function createUnlockedProposalProgress(
  chapters: PresentationChapter[],
  requestedChapterId: string | null,
  startedAt = Date.now()
): ProposalProgressState {
  const chapterId = resolveChapterId(chapters, requestedChapterId, chapters[0]?.id ?? "visao-geral");

  return {
    startedAt,
    lastChapter: chapterId,
    lastSeenAt: startedAt,
    version: COMMERCIAL_PRESENTATION_VERSION
  };
}

export function initializeProposalProgress(
  chapters: PresentationChapter[],
  requestedChapterId: string | null
): ProposalProgressState {
  const now = Date.now();
  const savedStartedAt = getCookie(OFFER_COOKIE_KEYS.startedAt);
  const savedLastChapter = getCookie(OFFER_COOKIE_KEYS.lastChapter);

  const shouldReset =
    !isValidTimestamp(savedStartedAt) ||
    !isValidChapterId(chapters, savedLastChapter);

  const startedAt = shouldReset ? now : Number(savedStartedAt);
  const chapterId = resolveChapterId(chapters, requestedChapterId, savedLastChapter);

  return {
    startedAt,
    lastChapter: chapterId,
    lastSeenAt: now,
    version: COMMERCIAL_PRESENTATION_VERSION
  };
}

export function persistProposalProgress(progress: ProposalProgressState) {
  setCookie(OFFER_COOKIE_KEYS.startedAt, String(progress.startedAt));
  setCookie(OFFER_COOKIE_KEYS.lastChapter, progress.lastChapter);
  setCookie(OFFER_COOKIE_KEYS.lastSeenAt, String(progress.lastSeenAt));
  setCookie(OFFER_COOKIE_KEYS.version, progress.version);
}

export function getActiveOfferState(startedAt: number, now: number): ActiveOfferState {
  const elapsedMs = Math.max(0, now - startedAt);
  const hour = 60 * 60 * 1000;

  if (elapsedMs < COMMERCIAL_OFFER_TIERS[0].deadlineHours * hour) {
    return {
      activeTier: COMMERCIAL_OFFER_TIERS[0],
      remainingMs: COMMERCIAL_OFFER_TIERS[0].deadlineHours * hour - elapsedMs,
      offerExpired: false
    };
  }

  if (elapsedMs < COMMERCIAL_OFFER_TIERS[1].deadlineHours * hour) {
    return {
      activeTier: COMMERCIAL_OFFER_TIERS[1],
      remainingMs: COMMERCIAL_OFFER_TIERS[1].deadlineHours * hour - elapsedMs,
      offerExpired: false
    };
  }

  if (elapsedMs < COMMERCIAL_OFFER_TIERS[2].deadlineHours * hour) {
    return {
      activeTier: COMMERCIAL_OFFER_TIERS[2],
      remainingMs: COMMERCIAL_OFFER_TIERS[2].deadlineHours * hour - elapsedMs,
      offerExpired: false
    };
  }

  return {
    activeTier: COMMERCIAL_OFFER_TIERS[2],
    remainingMs: 0,
    offerExpired: true
  };
}

export function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valueInCents / 100);
}

export function formatRemainingTime(remainingMs: number) {
  if (remainingMs <= 0) {
    return "Encerrado";
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

export function formatRemainingClock(remainingMs: number) {
  const safeRemainingMs = Math.max(0, remainingMs);
  const totalSeconds = Math.floor(safeRemainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function buildWhatsAppHref(currentChapterTitle: string, activeTier: CommercialOfferTier) {
  const message =
    `Olá, quero avançar com a Plataforma de Aulas. ` +
    `Vi a apresentação comercial e quero falar sobre a proposta vigente. ` +
    `Capítulo atual: ${currentChapterTitle}. ` +
    `Faixa ativa: ${activeTier.label} (${formatCurrency(activeTier.priceCurrent)}).`;

  return `https://wa.me/5582981093783?text=${encodeURIComponent(message)}`;
}
