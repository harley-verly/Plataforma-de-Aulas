"use client";

import { useState, useTransition } from "react";

import { DataStrip, Pill, SurfaceCard } from "@plataforma/ui";

import { getClientApiBaseUrl, type AdminOverviewResponse } from "../lib/platform-api";

export function AdminApprovalConsole({
  overview,
  initialApprovals
}: {
  overview: AdminOverviewResponse;
  initialApprovals: AdminOverviewResponse["approvals"];
}) {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="module-stack">
      <DataStrip
        items={[
          {
            label: "Checkouts registrados",
            value: String(overview.finance.lastCheckoutCount),
            note: "contagem do sandbox-first"
          },
          {
            label: "Webhooks recebidos",
            value: String(overview.finance.webhookEventsReceived),
            note: "eventos observados pelo painel"
          },
          {
            label: "Provedores de video",
            value: overview.health.videoProviders.join(" + "),
            note: overview.health.stagingDomain
          }
        ]}
      />

      {feedback ? <div className="status-banner status-banner-success">{feedback}</div> : null}

      <div className="queue-grid">
        {approvals.map((item) => (
          <SurfaceCard key={item.id} className="queue-card approval-card">
            <div className="course-card-meta">
              <Pill>{item.kind}</Pill>
              <Pill>{item.state}</Pill>
            </div>
            <h3>{item.displayName}</h3>
            <p>{item.note}</p>
            <label className="field">
              <span>Observacao da aprovacao</span>
              <input
                onChange={(event) =>
                  setNotesById((current) => ({
                    ...current,
                    [item.id]: event.target.value
                  }))
                }
                placeholder="aprovado pelo painel administrativo"
                value={notesById[item.id] ?? ""}
              />
            </label>
            <div className="action-row">
              <button
                className="primary-button"
                disabled={isPending || item.state === "approved"}
                onClick={() => {
                  startTransition(async () => {
                    const response = await fetch(`${getClientApiBaseUrl()}/admin/approvals/${item.id}/approve`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        notes: notesById[item.id] || undefined
                      })
                    });

                    if (!response.ok) {
                      setFeedback("Nao foi possivel registrar a aprovacao.");
                      return;
                    }

                    const payload = (await response.json()) as {
                      message: string;
                      approval: (typeof approvals)[number];
                    };

                    setApprovals((current) =>
                      current.map((approval) => (approval.id === item.id ? payload.approval : approval))
                    );
                    setFeedback(payload.message);
                  });
                }}
                type="button"
              >
                {item.state === "approved" ? "Aprovado" : "Aprovar agora"}
              </button>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
