import type { PlatformRole } from "@plataforma/contracts";

export const DEMO_SESSION_KEY = "plataforma-demo-session";
export const DEMO_SESSION_EVENT = "plataforma-demo-session-changed";

export interface DemoSession {
  email: string;
  role: PlatformRole;
  nextRoute: string;
  fullName?: string;
  token?: string;
  statusLabel?: string;
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
    return null;
  }

  try {
    return JSON.parse(rawValue) as DemoSession;
  } catch {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    return null;
  }
}

export function writeDemoSession(session: DemoSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  emitSessionChanged();
}

export function clearDemoSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DEMO_SESSION_KEY);
  emitSessionChanged();
}
