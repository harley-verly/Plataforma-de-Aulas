"use client";

import { useState, useTransition } from "react";

import { DataStrip, Pill, SurfaceCard } from "@plataforma/ui";

import { getClientApiBaseUrl, type StudioOverviewResponse } from "../lib/platform-api";

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

export function StudioConsole({ overview }: { overview: StudioOverviewResponse }) {
  const [producerName, setProducerName] = useState("Camila Freitas");
  const [producerEmail, setProducerEmail] = useState("camila@produtora.com.br");
  const [portfolioUrl, setPortfolioUrl] = useState("https://portfolio.exemplo.com.br/camila");
  const [draftTitle, setDraftTitle] = useState("Imersao de Onboarding Premium");
  const [draftSummary, setDraftSummary] = useState(
    "Programa desenhado para estruturar onboarding, acompanhamento e leitura de valor percebido em produtos educacionais."
  );
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  async function postJson(path: string, payload: Record<string, string>) {
    const response = await fetch(`${getClientApiBaseUrl()}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(data, "Nao foi possivel concluir a acao."));
    }

    return data as { message: string };
  }

  return (
    <div className="module-stack">
      <DataStrip items={overview.kpis} />

      <div className="split-grid">
        <SurfaceCard>
          <p className="section-eyebrow">pipeline atual</p>
          <div className="module-stack">
            {overview.pipeline.map((item) => (
              <div key={item.title} className="inline-card">
                <div className="course-card-meta">
                  <Pill>{item.state}</Pill>
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <p className="section-eyebrow">acoes do studio</p>
          <div className="module-stack">
            <form
              className="form-shell"
              onSubmit={(event) => {
                event.preventDefault();
                startTransition(async () => {
                  setFeedback(null);
                  try {
                    const data = await postJson("/studio/producers/apply", {
                      fullName: producerName,
                      email: producerEmail,
                      portfolioUrl
                    });
                    setFeedback({ tone: "success", text: data.message });
                  } catch (error) {
                    setFeedback({
                      tone: "error",
                      text: error instanceof Error ? error.message : "Nao foi possivel enviar a solicitacao."
                    });
                  }
                });
              }}
            >
              <h3>Solicitar entrada como produtor</h3>
              <div className="control-grid">
                <label className="field">
                  <span>Nome</span>
                  <input onChange={(event) => setProducerName(event.target.value)} required value={producerName} />
                </label>
                <label className="field">
                  <span>E-mail</span>
                  <input
                    onChange={(event) => setProducerEmail(event.target.value)}
                    required
                    type="email"
                    value={producerEmail}
                  />
                </label>
                <label className="field">
                  <span>Portfolio</span>
                  <input onChange={(event) => setPortfolioUrl(event.target.value)} required type="url" value={portfolioUrl} />
                </label>
              </div>
              <button className="primary-button" disabled={isPending} type="submit">
                Enviar para aprovacao
              </button>
            </form>

            <form
              className="form-shell"
              onSubmit={(event) => {
                event.preventDefault();
                startTransition(async () => {
                  setFeedback(null);
                  try {
                    const data = await postJson("/studio/courses", {
                      title: draftTitle,
                      summary: draftSummary
                    });
                    setFeedback({ tone: "success", text: data.message });
                  } catch (error) {
                    setFeedback({
                      tone: "error",
                      text: error instanceof Error ? error.message : "Nao foi possivel criar o rascunho."
                    });
                  }
                });
              }}
            >
              <h3>Criar rascunho de curso</h3>
              <div className="control-grid">
                <label className="field">
                  <span>Titulo</span>
                  <input onChange={(event) => setDraftTitle(event.target.value)} required value={draftTitle} />
                </label>
                <label className="field">
                  <span>Resumo</span>
                  <textarea onChange={(event) => setDraftSummary(event.target.value)} required rows={4} value={draftSummary} />
                </label>
              </div>
              <button className="primary-button" disabled={isPending} type="submit">
                Gerar rascunho
              </button>
            </form>

            {feedback ? (
              <div className={feedback.tone === "error" ? "status-banner status-banner-error" : "status-banner status-banner-success"}>
                {feedback.text}
              </div>
            ) : null}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
