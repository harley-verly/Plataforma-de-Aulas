"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { routeByRole } from "@plataforma/config";
import type { PlatformRole } from "@plataforma/contracts";

import { writeDemoSession } from "../lib/demo-session";
import { getClientApiBaseUrl, type AuthLoginResponse, type AuthRegisterResponse } from "../lib/platform-api";

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
  const [fullName, setFullName] = useState("Harley Verly");
  const [email, setEmail] = useState("contato@abasolucoesetecnologia.com.br");
  const [password, setPassword] = useState("premium123");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectParam = searchParams.get("redirect");
  const redirectTarget = redirectParam?.startsWith("/") ? redirectParam : null;

  return (
    <div className="auth-shell auth-shell-course">
      <section className="auth-hero">
        <Link href="/" className="auth-brand">
          <div className="auth-brand-mark">
            <span className="member-brand-dot" />
          </div>
          <div>
            <span className="eyebrow">plataforma oficial</span>
            <strong>Plataforma de Aulas</strong>
            <p>Experiencia proprietaria para descoberta, compra e consumo de aulas.</p>
          </div>
        </Link>

        <div className="auth-copy-card auth-copy-card-course">
          <span className="eyebrow">acesso central</span>
          <h1>Uma unica entrada para aluno, produtor, afiliado e operacao interna.</h1>
          <p>
            O cadastro publico nasce como conta de aluno. Solicitacoes para afiliacao e publicacao de cursos acontecem
            somente por dentro da area logada, do jeito certo para uma plataforma real.
          </p>
          <div className="auth-pill-row">
            <span className="scope-pill">area do aluno</span>
            <span className="scope-pill">solicitacoes internas</span>
            <span className="scope-pill">acesso administrativo controlado</span>
          </div>
          <div className="auth-guidance-card">
            <strong>Regra de acesso da demo</strong>
            <p>
              Ninguem escolhe papel sensivel nesta tela. Perfis administrativos usam credenciais internas, e afiliado
              ou produtor pedem liberacao depois do login.
            </p>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="card-topline">
          <strong>{mode === "login" ? "Entrar na plataforma" : "Criar conta de aluno"}</strong>
          <span>{mode === "login" ? "Sessao oficial" : "Cadastro inicial"}</span>
        </div>

        {feedback ? (
          <div className={feedback.tone === "error" ? "integration-notice danger" : "integration-notice success"}>
            <strong>{feedback.tone === "error" ? "Atencao" : "Operacao concluida"}</strong>
            <p>{feedback.text}</p>
          </div>
        ) : null}

        <form
          className="form-grid auth-form"
          onSubmit={(event) => {
            event.preventDefault();

            startTransition(async () => {
              setFeedback(null);

              const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
              const payload = mode === "login" ? { email, password } : { fullName, email, password };

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
                    fullName: data.session.fullName,
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
                    statusLabel: "cadastro concluido"
                  });
                  router.push(targetRoute);
                  return;
                }
              } catch {
                setFeedback({
                  tone: "error",
                  text: "A API nao respondeu. Verifique se o backend esta ativo."
                });
              }
            });
          }}
        >
          {mode === "register" ? (
            <label className="field-label">
              <span>Nome completo</span>
              <input
                className="field-input"
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Seu nome completo"
                required
                value={fullName}
              />
            </label>
          ) : null}

          <label className="field-label">
            <span>E-mail</span>
            <input
              className="field-input"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@empresa.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="field-label">
            <span>Senha</span>
            <input
              className="field-input"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite sua senha"
              required
              type="password"
              value={password}
            />
          </label>

          <div className="auth-form-note">
            <strong>Como funciona a liberacao interna</strong>
            <p>
              Depois do primeiro acesso, o proprio usuario pode solicitar entrada no programa de afiliados ou no fluxo
              de produtor de forma interna, sem burlar governanca.
            </p>
          </div>

          <div className="action-row">
            <button className="primary-action" disabled={isPending} type="submit">
              {isPending
                ? mode === "login"
                  ? "Entrando..."
                  : "Criando conta..."
                : mode === "login"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
            <button
              className="secondary-action workspace-link"
              onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
              type="button"
            >
              {mode === "login" ? "Criar conta" : "Ja tenho conta"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
