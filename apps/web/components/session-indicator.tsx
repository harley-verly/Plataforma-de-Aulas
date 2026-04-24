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
    return (
      <div className="marketing-session-actions">
        <Link className="marketing-header-link" href="/login">
          Entrar
        </Link>
        <ButtonLink href="/login?mode=register">Criar conta</ButtonLink>
      </div>
    );
  }

  return (
    <div className="marketing-session-actions marketing-session-actions-active">
      <div className="marketing-user-chip">{getDisplayName(session)}</div>
      <div className="public-session-actions">
        <Link className="marketing-header-link" href={session.nextRoute}>
          Minha area
        </Link>
        <Link className="button-link" href={session.nextRoute}>
          Continuar
        </Link>
        <button
          className="marketing-header-link marketing-header-button"
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
