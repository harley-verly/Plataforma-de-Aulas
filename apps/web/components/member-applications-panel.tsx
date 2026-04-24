"use client";

import { useEffect, useState, useTransition } from "react";

import { SurfaceCard } from "@plataforma/ui";

import { readDemoSession } from "../lib/demo-session";
import { getClientApiBaseUrl } from "../lib/platform-api";

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

export function MemberApplicationsPanel() {
  const [fullName, setFullName] = useState("Harley Verly");
  const [email, setEmail] = useState("contato@abasolucoesetecnologia.com.br");
  const [channelUrl, setChannelUrl] = useState("https://instagram.com/seu-canal");
  const [portfolioUrl, setPortfolioUrl] = useState("https://seusite.com/portfolio");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [sessionRole, setSessionRole] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const session = readDemoSession();
    if (!session) {
      return;
    }

    setSessionRole(session.role);
    setEmail(session.email);
    if (session.fullName) {
      setFullName(session.fullName);
    }
  }, []);

  if (sessionRole && sessionRole !== "student") {
    return (
      <div className="member-status-note">
        Seu acesso atual ja possui uma permissao interna ativa. As solicitacoes abaixo ficam disponiveis para contas de
        aluno dentro da plataforma.
      </div>
    );
  }

  return (
    <div className="member-application-grid">
      <SurfaceCard className="member-application-card">
        <div className="member-card-copy">
          <span className="member-card-kicker">programa interno</span>
          <h3>Quero me tornar afiliado</h3>
          <p>
            A conta continua comum. O pedido de afiliacao nasce aqui por dentro, com avaliacao de canal e governanca.
          </p>
        </div>

        <form
          className="form-grid"
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
                  throw new Error(getErrorMessage(data, "Nao foi possivel registrar a solicitacao de afiliacao."));
                }

                setFeedback({
                  tone: "success",
                  text: typeof data.message === "string" ? data.message : "Solicitacao de afiliacao enviada."
                });
              } catch (error) {
                setFeedback({
                  tone: "error",
                  text:
                    error instanceof Error
                      ? error.message
                      : "Nao foi possivel registrar a solicitacao de afiliacao."
                });
              }
            });
          }}
        >
          <label className="field-label">
            <span>Nome</span>
            <input className="field-input" onChange={(event) => setFullName(event.target.value)} required value={fullName} />
          </label>
          <label className="field-label">
            <span>E-mail</span>
            <input className="field-input" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label className="field-label field-span-full">
            <span>Canal de divulgacao</span>
            <input
              className="field-input"
              onChange={(event) => setChannelUrl(event.target.value)}
              required
              type="url"
              value={channelUrl}
            />
          </label>
          <button className="primary-action" disabled={isPending} type="submit">
            Enviar para avaliacao
          </button>
        </form>
      </SurfaceCard>

      <SurfaceCard className="member-application-card">
        <div className="member-card-copy">
          <span className="member-card-kicker">studio interno</span>
          <h3>Quero publicar meu curso</h3>
          <p>
            O pedido de entrada como produtor tambem acontece na conta logada, com portfolio e revisao operacional.
          </p>
        </div>

        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault();

            startTransition(async () => {
              setFeedback(null);

              try {
                const response = await fetch(`${getClientApiBaseUrl()}/studio/producers/apply`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    fullName,
                    email,
                    portfolioUrl
                  })
                });

                const data = await response.json();
                if (!response.ok) {
                  throw new Error(getErrorMessage(data, "Nao foi possivel registrar a solicitacao de produtor."));
                }

                setFeedback({
                  tone: "success",
                  text: typeof data.message === "string" ? data.message : "Solicitacao de produtor enviada."
                });
              } catch (error) {
                setFeedback({
                  tone: "error",
                  text:
                    error instanceof Error
                      ? error.message
                      : "Nao foi possivel registrar a solicitacao de produtor."
                });
              }
            });
          }}
        >
          <label className="field-label">
            <span>Nome</span>
            <input className="field-input" onChange={(event) => setFullName(event.target.value)} required value={fullName} />
          </label>
          <label className="field-label">
            <span>E-mail</span>
            <input className="field-input" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label className="field-label field-span-full">
            <span>Portfolio ou pagina de apresentacao</span>
            <input
              className="field-input"
              onChange={(event) => setPortfolioUrl(event.target.value)}
              required
              type="url"
              value={portfolioUrl}
            />
          </label>
          <button className="primary-action" disabled={isPending} type="submit">
            Solicitar acesso ao studio
          </button>
        </form>
      </SurfaceCard>

      {feedback ? (
        <div className={feedback.tone === "error" ? "integration-notice danger" : "integration-notice success"}>
          <strong>{feedback.tone === "error" ? "Atencao" : "Solicitacao registrada"}</strong>
          <p>{feedback.text}</p>
        </div>
      ) : null}
    </div>
  );
}
