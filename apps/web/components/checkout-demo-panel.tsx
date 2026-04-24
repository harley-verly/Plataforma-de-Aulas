"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { Pill, SurfaceCard } from "@plataforma/ui";

import { readDemoSession } from "../lib/demo-session";
import { getClientApiBaseUrl, type CheckoutOfferResponse, type CheckoutSessionResponse } from "../lib/platform-api";

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

export function CheckoutDemoPanel({ course, offer }: CheckoutOfferResponse) {
  const [buyerName, setBuyerName] = useState("Harley Verly");
  const [buyerEmail, setBuyerEmail] = useState("contato@abasolucoesetecnologia.com.br");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [session, setSession] = useState<CheckoutSessionResponse | null>(null);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedSession = readDemoSession();
    if (!storedSession) {
      return;
    }

    setBuyerEmail(storedSession.email);
    if (storedSession.fullName) {
      setBuyerName(storedSession.fullName);
    }
  }, []);

  return (
    <div className="split-grid">
      <SurfaceCard className="checkout-shell checkout-shell-primary">
        <div className="course-card-meta">
          <Pill>{course.producerName}</Pill>
          <Pill>{course.audience}</Pill>
        </div>
        <h2>{course.title}</h2>
        <p>{course.subtitle}</p>
        <p className="offer-price">{offer.priceLabel}</p>
        <p>{offer.description}</p>
        <div className="checkout-meta-grid">
          <div className="inline-card">
            <span className="muted-label">modelo</span>
            <strong>{offer.billingModel === "subscription" ? "recorrencia" : "compra avulsa"}</strong>
          </div>
          <div className="inline-card">
            <span className="muted-label">modo</span>
            <strong>sandbox-first com Asaas</strong>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="checkout-shell">
        <form
          className="form-shell"
          onSubmit={(event) => {
            event.preventDefault();

            startTransition(async () => {
              setFeedback(null);

              try {
                const response = await fetch(`${getClientApiBaseUrl()}/checkout/sessions`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    offerId: offer.id,
                    buyerName,
                    buyerEmail,
                    affiliateCode: affiliateCode.trim() || undefined
                  })
                });

                const data = (await response.json()) as CheckoutSessionResponse | { message?: string | string[] };
                if (!response.ok) {
                  setFeedback({
                    tone: "error",
                    text: getErrorMessage(data, "Nao foi possivel criar a sessao de checkout.")
                  });
                  return;
                }

                setSession(data as CheckoutSessionResponse);
                setFeedback({
                  tone: "success",
                  text: "Sessao de checkout criada com sucesso em modo sandbox-first."
                });
              } catch {
                setFeedback({
                  tone: "error",
                  text: "A API nao respondeu. Verifique a stack da aplicacao."
                });
              }
            });
          }}
        >
          <div className="control-grid">
            <label className="field">
              <span>Nome do comprador</span>
              <input onChange={(event) => setBuyerName(event.target.value)} required value={buyerName} />
            </label>
            <label className="field">
              <span>E-mail do comprador</span>
              <input onChange={(event) => setBuyerEmail(event.target.value)} required type="email" value={buyerEmail} />
            </label>
            <label className="field">
              <span>Codigo de afiliado</span>
              <input
                onChange={(event) => setAffiliateCode(event.target.value)}
                placeholder="opcional"
                value={affiliateCode}
              />
            </label>
          </div>

          {feedback ? (
            <div className={feedback.tone === "error" ? "status-banner status-banner-error" : "status-banner status-banner-success"}>
              {feedback.text}
            </div>
          ) : null}

          <div className="action-row">
            <button className="primary-button" disabled={isPending} type="submit">
              {isPending ? "Criando sessao..." : "Gerar checkout de demonstracao"}
            </button>
            <Link className="ghost-link" href={`/catalog/${course.slug}`}>
              Voltar para a oferta
            </Link>
          </div>
        </form>

        {session ? (
          <div className="result-block">
            <div className="course-card-meta">
              <Pill>{session.provider}</Pill>
              <Pill>{session.mode}</Pill>
            </div>
            <h3>Checkout {session.checkoutId}</h3>
            <p>
              Split preparado: <strong>{session.splitPrepared ? "sim" : "nao"}</strong>
            </p>
            <div className="action-row">
              <Link className="button-link" href={session.urls.success}>
                Ir para a area do aluno
              </Link>
              <span className="muted-label">status inicial: {session.status}</span>
            </div>
          </div>
        ) : null}
      </SurfaceCard>
    </div>
  );
}
