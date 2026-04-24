import { useEffect, useState } from "react";

import { DEMO_SESSION_EVENT, readDemoSession, type DemoSession } from "@/lib/demo-session";

export function useDemoSession() {
  const [session, setSession] = useState<DemoSession | null>(() => readDemoSession());

  useEffect(() => {
    const syncSession = () => {
      setSession(readDemoSession());
    };

    window.addEventListener(DEMO_SESSION_EVENT, syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener(DEMO_SESSION_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return session;
}
