export type DemoSessionRole =
  | "super_admin"
  | "platform_admin"
  | "producer"
  | "affiliate"
  | "student"
  | "support";

export type DemoSession = {
  token?: string;
  email?: string;
  fullName?: string;
  role: DemoSessionRole | string;
  nextRoute?: string;
};

export const DEMO_SESSION_STORAGE_KEY = "plataforma_demo_session";

const roleMap: Record<string, DemoSessionRole> = {
  SUPER_ADMIN: "super_admin",
  PLATFORM_ADMIN: "platform_admin",
  PRODUCER: "producer",
  AFFILIATE: "affiliate",
  STUDENT: "student",
  SUPPORT: "support"
};

export function normalizeRole(role: string | null | undefined): DemoSessionRole | null {
  if (!role) {
    return null;
  }

  const trimmed = role.trim();
  const upper = trimmed.toUpperCase();

  return roleMap[upper] ?? (Object.values(roleMap).includes(trimmed as DemoSessionRole) ? (trimmed as DemoSessionRole) : null);
}

export function canAccessAdmin(session: Pick<DemoSession, "role"> | null | undefined) {
  const role = normalizeRole(session?.role);
  return role === "platform_admin" || role === "super_admin";
}

export function readDemoSession(): DemoSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DemoSession;
  } catch {
    window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
    return null;
  }
}

export function saveDemoSession(session: DemoSession) {
  window.localStorage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
}
