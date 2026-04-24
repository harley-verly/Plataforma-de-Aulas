"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink, Pill } from "@plataforma/ui";

import { DEMO_SESSION_EVENT, clearDemoSession, readDemoSession, type DemoSession } from "../lib/demo-session";

export function SessionIndicator() {
  const [session, setSession] = useState<DemoSession | null>(null);

  useEffect(() => {
    const syncSession = () => {
      setSession(readDemoSession());
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(DEMO_SESSION_EVENT, syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(DEMO_SESSION_EVENT, syncSession);
    };
  }, []);

  if (!session) {
    return <ButtonLink href="/login">Entrar</ButtonLink>;
  }

  return (
    <div className="session-chip">
      <div className="session-chip-meta">
        <Pill>{session.role}</Pill>
        <span>{session.email}</span>
      </div>
      <div className="session-chip-actions">
        <Link className="ghost-link" href={session.nextRoute}>
          Abrir painel
        </Link>
        <button
          className="text-button"
          onClick={() => {
            clearDemoSession();
          }}
          type="button"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
