import { cookies } from "next/headers";

import { DEMO_SESSION_COOKIE, parseDemoSession } from "./demo-session";

export async function getServerDemoSession() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(DEMO_SESSION_COOKIE)?.value;

  if (!rawValue) {
    return null;
  }

  return parseDemoSession(decodeURIComponent(rawValue));
}
