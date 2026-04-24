import type { PlatformRole } from "@plataforma/contracts";

export const DEMO_SESSION_KEY = "plataforma-demo-session";
export const DEMO_SESSION_COOKIE = "plataforma-demo-access";
export const DEMO_SESSION_EVENT = "plataforma-demo-session-changed";

export interface DemoSession {
  email: string;
  role: PlatformRole;
  nextRoute: string;
  fullName?: string;
  token?: string;
  statusLabel?: string;
}

export function parseDemoSession(rawValue: string | null | undefined) {
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as DemoSession;
  } catch {
    return null;
  }
}

export function serializeDemoSession(session: DemoSession) {
  return encodeURIComponent(JSON.stringify(session));
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieEntry = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  if (!cookieEntry) {
    return null;
  }

  return cookieEntry.slice(name.length + 1);
}

function readDemoSessionCookie() {
  const rawCookie = getCookieValue(DEMO_SESSION_COOKIE);
  if (!rawCookie) {
    return null;
  }

  return parseDemoSession(decodeURIComponent(rawCookie));
}

function writeDemoSessionCookie(session: DemoSession) {
  if (typeof document === "undefined") {
    return;
  }

  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${DEMO_SESSION_COOKIE}=${serializeDemoSession(session)}; Path=/; Max-Age=604800; SameSite=Lax${secureFlag}`;
}

function clearDemoSessionCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${DEMO_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function emitSessionChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
}

export function readDemoSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(DEMO_SESSION_KEY);
  if (!rawValue) {
    return readDemoSessionCookie();
  }

  const session = parseDemoSession(rawValue);
  if (!session) {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    return readDemoSessionCookie();
  }

  return session;
}

export function writeDemoSession(session: DemoSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  writeDemoSessionCookie(session);
  emitSessionChanged();
}

export function clearDemoSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DEMO_SESSION_KEY);
  clearDemoSessionCookie();
  emitSessionChanged();
}
