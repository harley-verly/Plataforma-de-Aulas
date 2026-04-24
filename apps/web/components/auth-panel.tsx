"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

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
  const requestedMode = searchParams.get("mode");

  useEffect(() => {
    if (requestedMode === "register") {
      setMode("register");
      return;
    }

    if (requestedMode === "login") {
      setMode("login");
    }
  }, [requestedMode]);

  return (
    <div className="academy-login-shell">
      <section className="academy-login-pane">
        <div className="academy-login-brand">
          <Image
            src="/references/logo-deitado-lobus.png"
            alt="Instituto Metaterapia"
            width={280}
            height={74}
            className="academy-brand-logo"
            priority
          />
        </div>

        {feedback ? (
          <div className={feedback.tone === "error" ? "integration-notice danger" : "integration-notice success"}>
            <strong>{feedback.tone === "error" ? "Atencao" : "Operacao concluida"}</strong>
            <p>{feedback.text}</p>
          </div>
        ) : null}

        <form
          className="academy-auth-form"
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
            <>
              <label className="academy-field">
                <span>Nome completo</span>
                <input onChange={(event) => setFullName(event.target.value)} required value={fullName} />
              </label>
              <label className="academy-field">
                <span>E-mail</span>
                <input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
              </label>
              <label className="academy-field">
                <span>Senha</span>
                <input onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
              </label>

              <button className="academy-primary-button" disabled={isPending} type="submit">
                {isPending ? "Criando conta..." : "Criar conta"}
              </button>

              <div className="academy-auth-assist">
                <h2>Conta inicial de aluno</h2>
                <p>Afiliacao e produtor sao pedidos internos, depois do login, dentro da propria plataforma.</p>
                <button className="academy-secondary-button" onClick={() => setMode("login")} type="button">
                  Ja tenho conta
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="academy-field">
                <span>E-mail</span>
                <input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
              </label>
              <label className="academy-field">
                <span>Senha</span>
                <input onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
              </label>

              <label className="academy-remember-row">
                <input type="checkbox" />
                <span>Remember Me</span>
              </label>

              <button className="academy-primary-button" disabled={isPending} type="submit">
                {isPending ? "Entrando..." : "Entrar"}
              </button>

              <div className="academy-auth-assist">
                <h2>Ainda nao tem uma senha?</h2>
                <p>Clique no botao abaixo para criar seu acesso inicial de aluno ou atualizar sua entrada na demo.</p>
                <button className="academy-secondary-button" onClick={() => setMode("register")} type="button">
                  Criar ou alterar acesso
                </button>
              </div>
            </>
          )}
        </form>
      </section>

      <section className="academy-login-visual">
        <div className="academy-login-credit">
          <p>Feito por Harley Aragao - L.O.Bus para voce</p>
          <strong>© 2026 - Todos os direitos reservados</strong>
        </div>
      </section>
    </div>
  );
}
