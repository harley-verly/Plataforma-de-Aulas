"use client";

import { useState, useTransition } from "react";

import { DataStrip, Pill, SurfaceCard } from "@plataforma/ui";

import type { AffiliateOverviewResponse } from "../lib/platform-api";

export function AffiliateConsole({ overview }: { overview: AffiliateOverviewResponse }) {
  const [campaignSlug, setCampaignSlug] = useState("campanha-instituto");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="module-stack">
      <DataStrip items={overview.kpis} />

      <div className="split-grid">
        <SurfaceCard className="member-console-card">
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

        <SurfaceCard className="member-console-card">
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              startTransition(async () => {
                setFeedback({
                  tone: "success",
                  text: `Link de demonstracao preparado para a campanha ${campaignSlug}.`
                });
              });
            }}
          >
            <p className="section-eyebrow">operacao ativa</p>
            <h3>Gerar campanha interna</h3>
            <label className="field-label">
              <span>Slug da campanha</span>
              <input
                className="field-input"
                onChange={(event) => setCampaignSlug(event.target.value)}
                required
                value={campaignSlug}
              />
            </label>
            <p className="section-copy">
              A aplicacao de afiliado acontece dentro da conta comum. Quem chegou nesta tela ja foi aprovado e enxerga
              apenas ferramentas operacionais.
            </p>
            <button className="primary-action" disabled={isPending} type="submit">
              Gerar link de demonstracao
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
