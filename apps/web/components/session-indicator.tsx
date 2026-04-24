"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@plataforma/ui";

import { DEMO_SESSION_EVENT, clearDemoSession, readDemoSession, type DemoSession } from "../lib/demo-session";

function getDisplayName(session: DemoSession) {
  if (session.fullName?.trim()) {
    return session.fullName.trim();
  }

  return session.email;
}

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
    <div className="public-session-card">
      <div className="public-session-copy">
        <span className="muted-label">sessao ativa</span>
        <strong>{getDisplayName(session)}</strong>
      </div>
      <div className="public-session-actions">
        <Link className="secondary-action workspace-link" href={session.nextRoute}>
          Minha area
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
