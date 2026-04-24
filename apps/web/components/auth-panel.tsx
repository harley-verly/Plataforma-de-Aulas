"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { routeByRole } from "@plataforma/config";
import type { PlatformRole } from "@plataforma/contracts";
import { Pill, SurfaceCard } from "@plataforma/ui";

import { writeDemoSession } from "../lib/demo-session";
import { getClientApiBaseUrl, type AuthLoginResponse, type AuthRegisterResponse } from "../lib/platform-api";

const roleOptions: Array<{ value: PlatformRole; label: string; hint: string }> = [
  { value: "student", label: "Aluno", hint: "area do aluno com progresso e retomada" },
  { value: "producer", label: "Produtor", hint: "studio com aprovacao e rascunhos" },
  { value: "affiliate", label: "Afiliado", hint: "links, conversao e comissao" },
  { value: "platform_admin", label: "Admin da plataforma", hint: "governanca, aprovacao e saude operacional" },
  { value: "support", label: "Suporte", hint: "acompanhamento interno da operacao" },
  { value: "super_admin", label: "Super admin", hint: "controle maximo do ambiente" }
];

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

function isRouteAllowedForRole(role: PlatformRole, pathname: string) {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return role === "super_admin" || role === "platform_admin" || role === "support";
  }

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return role === "super_admin" || role === "platform_admin" || role === "producer";
  }

  if (pathname === "/affiliate" || pathname.startsWith("/affiliate/")) {
    return role === "super_admin" || role === "platform_admin" || role === "affiliate";
  }

  if (pathname === "/learning" || pathname.startsWith("/learning/")) {
    return role === "super_admin" || role === "platform_admin" || role === "support" || role === "student";
  }

  return true;
}

export function AuthPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<PlatformRole>("student");
  const [fullName, setFullName] = useState("Harley Verly");
  const [email, setEmail] = useState("contato@abasolucoesetecnologia.com.br");
  const [password, setPassword] = useState("premium123");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectParam = searchParams.get("redirect");
  const redirectTarget = redirectParam?.startsWith("/") ? redirectParam : null;

  return (
    <div className="split-grid">
      <SurfaceCard className="auth-shell">
        <div className="segmented-control" role="tablist" aria-label="Modo de autenticacao">
          <button
            className={mode === "login" ? "segment-button segment-button-active" : "segment-button"}
            onClick={() => setMode("login")}
            type="button"
          >
            Entrar
          </button>
          <button
            className={mode === "register" ? "segment-button segment-button-active" : "segment-button"}
            onClick={() => setMode("register")}
            type="button"
          >
            Criar conta
          </button>
        </div>

        <form
          className="form-shell"
          onSubmit={(event) => {
            event.preventDefault();

            startTransition(async () => {
              setFeedback(null);

              const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
              const payload =
                mode === "login"
                  ? { email, password, role }
                  : { fullName, email, password, role };

              try {
                const response = await fetch(`${getClientApiBaseUrl()}${endpoint}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(payload)
                });

                const data = (await response.json()) as AuthLoginResponse | AuthRegisterResponse | { message?: string | string[] };
                if (!response.ok) {
                  setFeedback({
                    tone: "error",
                    text: getErrorMessage(data, "Nao foi possivel concluir a autenticacao.")
                  });
                  return;
                }

                if (mode === "login" && "session" in data) {
                  const homeRoute = routeByRole[data.session.role];
                  const targetRoute =
                    redirectTarget && isRouteAllowedForRole(data.session.role, redirectTarget) ? redirectTarget : homeRoute;

                  writeDemoSession({
                    email: data.session.email,
                    role: data.session.role,
                    nextRoute: homeRoute,
                    token: data.session.token,
                    statusLabel: "login ativo"
                  });
                  router.push(targetRoute);
                  return;
                }

                if (mode === "register" && "user" in data) {
                  const homeRoute = routeByRole[data.user.role];
                  const targetRoute =
                    redirectTarget && isRouteAllowedForRole(data.user.role, redirectTarget) ? redirectTarget : homeRoute;

                  writeDemoSession({
                    email: data.user.email,
                    role: data.user.role,
                    nextRoute: homeRoute,
                    fullName: data.user.fullName,
                    statusLabel: "cadastro sandbox"
                  });
                  router.push(targetRoute);
                  return;
                }

                setFeedback({
                  tone: "success",
                  text: "Fluxo concluido com sucesso."
                });
              } catch {
                setFeedback({
                  tone: "error",
                  text: "A API nao respondeu. Verifique se o backend esta ativo."
                });
              }
            });
          }}
        >
          <div className="control-grid">
            {mode === "register" ? (
              <label className="field">
                <span>Nome completo</span>
                <input onChange={(event) => setFullName(event.target.value)} required value={fullName} />
              </label>
            ) : null}

            <label className="field">
              <span>E-mail</span>
              <input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
            </label>

            <label className="field">
              <span>Senha</span>
              <input onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            </label>

            <label className="field">
              <span>Papel inicial</span>
              <select onChange={(event) => setRole(event.target.value as PlatformRole)} value={role}>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {feedback ? (
            <div className={feedback.tone === "error" ? "status-banner status-banner-error" : "status-banner status-banner-success"}>
              {feedback.text}
            </div>
          ) : null}

          <div className="action-row">
            <button className="primary-button" disabled={isPending} type="submit">
              {isPending ? "Processando..." : mode === "login" ? "Entrar no staging" : "Criar conta sandbox"}
            </button>
            <p className="muted-label">
              O fluxo grava uma sessao local de demonstracao e redireciona para a area correspondente.
            </p>
          </div>
        </form>
      </SurfaceCard>

      <SurfaceCard className="auth-shell">
        <p className="section-eyebrow">perfis de entrada</p>
        <div className="module-stack">
          {roleOptions.map((option) => (
            <div key={option.value} className="inline-card">
              <div className="course-card-meta">
                <Pill>{option.value}</Pill>
                {option.value === role ? <Pill className="pill-accent">selecionado</Pill> : null}
              </div>
              <h3>{option.label}</h3>
              <p>{option.hint}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
