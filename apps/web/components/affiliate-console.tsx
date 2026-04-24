"use client";

import { useState, useTransition } from "react";

import { DataStrip, Pill, SurfaceCard } from "@plataforma/ui";

import { getClientApiBaseUrl, type AffiliateOverviewResponse } from "../lib/platform-api";

function getErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const message = "message" in payload ? payload.message : undefined;
  if (Array.isArray(message)) {
    return message.join(" ");
  }
  if (typeof message === "string") {
    return message;
  }

  return fallback;
}

export function AffiliateConsole({ overview }: { overview: AffiliateOverviewResponse }) {
  const [fullName, setFullName] = useState("Carlos Ventura");
  const [email, setEmail] = useState("carlos@afiliado.com.br");
  const [channelUrl, setChannelUrl] = useState("https://instagram.com/carlosventura");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="module-stack">
      <DataStrip items={overview.kpis} />

      <div className="split-grid">
        <SurfaceCard>
          <p className="section-eyebrow">links ativos</p>
          <div className="module-stack">
            {overview.links.map((link) => (
              <div key={link.slug} className="inline-card">
                <div className="course-card-meta">
                  <Pill>{link.status}</Pill>
                  <Pill>{link.slug}</Pill>
                </div>
                <p>{link.destination}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <form
            className="form-shell"
            onSubmit={(event) => {
              event.preventDefault();
              startTransition(async () => {
                setFeedback(null);

                try {
                  const response = await fetch(`${getClientApiBaseUrl()}/affiliate/apply`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      fullName,
                      email,
                      channelUrl
                    })
                  });

                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error(getErrorMessage(data, "Nao foi possivel registrar a solicitacao."));
                  }

                  setFeedback({
                    tone: "success",
                    text: typeof data.message === "string" ? data.message : "Solicitacao registrada."
                  });
                } catch (error) {
                  setFeedback({
                    tone: "error",
                    text: error instanceof Error ? error.message : "Nao foi possivel registrar a solicitacao."
                  });
                }
              });
            }}
          >
            <p className="section-eyebrow">entrada com aprovacao</p>
            <h3>Aplicar como afiliado</h3>
            <div className="control-grid">
              <label className="field">
                <span>Nome</span>
                <input onChange={(event) => setFullName(event.target.value)} required value={fullName} />
              </label>
              <label className="field">
                <span>E-mail</span>
                <input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
              </label>
              <label className="field">
                <span>Canal de divulgacao</span>
                <input onChange={(event) => setChannelUrl(event.target.value)} required type="url" value={channelUrl} />
              </label>
            </div>
            <button className="primary-button" disabled={isPending} type="submit">
              Enviar para avaliacao
            </button>
          </form>

          {feedback ? (
            <div className={feedback.tone === "error" ? "status-banner status-banner-error" : "status-banner status-banner-success"}>
              {feedback.text}
            </div>
          ) : null}
        </SurfaceCard>
      </div>
    </div>
  );
}
