import { useEffect, useState, useTransition } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getDefaultRouteForRole, isRouteAllowedForRole } from "@/lib/access";
import { writeDemoSession } from "@/lib/demo-session";
import { loginAccount, registerAccount } from "@/lib/platform-api";

function getMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("Harley Verly");
  const [email, setEmail] = useState("aluno@plataforma.local");
  const [password, setPassword] = useState("premium123");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectParam = searchParams.get("redirect");
  const redirectTarget = redirectParam?.startsWith("/") ? redirectParam : null;
  const requestedMode = searchParams.get("mode");

  useEffect(() => {
    if (requestedMode === "register") {
      setMode("register");
    } else if (requestedMode === "login") {
      setMode("login");
    }
  }, [requestedMode]);

  return (
    <SiteLayout>
      <section className="container-editorial pb-24 pt-12 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-ink-line bg-gradient-ink p-10 md:p-14">
            <SectionLabel number="04">Entrada principal</SectionLabel>
            <h1 className="mt-8 font-serif text-5xl leading-[0.98] text-paper md:text-7xl text-balance">
              A mesma fachada premium conduz a uma entrada <em className="italic text-gold-soft">objetiva e limpa</em>.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper-soft md:text-lg">
              O login nao pergunta papel sensivel nem abre excecoes fora do fluxo. Toda conta publica entra
              como aluno, e as solicitacoes internas acontecem depois, dentro da plataforma.
            </p>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Conta inicial",
                  text: "Toda nova conta nasce como aluno e entra direto na area de consumo."
                },
                {
                  label: "Aplicacoes internas",
                  text: "Pedidos para produtor e afiliado ficam dentro da sessao autenticada."
                },
                {
                  label: "Operacao protegida",
                  text: "Admin, studio e affiliate obedecem regra de acesso por perfil."
                }
              ].map((item) => (
                <div key={item.label} className="border border-ink-line bg-ink-soft p-6">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{item.label}</p>
                  <p className="mt-4 text-sm leading-relaxed text-paper-soft">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-ink-line bg-ink-soft p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              {mode === "login" ? "Acesso" : "Cadastro"}
            </p>
            <h2 className="mt-4 font-serif text-4xl text-paper">
              {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta inicial"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">
              {mode === "login"
                ? "Entre com um usuario existente para acessar a area correta do seu perfil."
                : "O cadastro publico cria uma conta de aluno pronta para continuar a jornada dentro da plataforma."}
            </p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] ${
                  mode === "login" ? "border border-gold/40 text-gold" : "text-paper-muted"
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] ${
                  mode === "register" ? "border border-gold/40 text-gold" : "text-paper-muted"
                }`}
              >
                Criar conta
              </button>
            </div>

            {feedback ? (
              <div
                className={`mt-8 border px-5 py-4 text-sm ${
                  feedback.tone === "error"
                    ? "border-destructive/40 bg-destructive/10 text-paper"
                    : "border-gold/30 bg-gold/10 text-paper"
                }`}
              >
                {feedback.text}
              </div>
            ) : null}

            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();

                startTransition(() => {
                  void (async () => {
                    setFeedback(null);

                    try {
                      if (mode === "login") {
                        const data = await loginAccount({ email, password });
                        const homeRoute = getDefaultRouteForRole(data.session.role);
                        const targetRoute =
                          redirectTarget && isRouteAllowedForRole(data.session.role, redirectTarget)
                            ? redirectTarget
                            : homeRoute;

                        writeDemoSession({
                          email: data.session.email,
                          fullName: data.session.fullName,
                          role: data.session.role,
                          nextRoute: homeRoute,
                          token: data.session.token,
                          statusLabel: "login ativo"
                        });
                        navigate(targetRoute, { replace: true });
                        return;
                      }

                      const data = await registerAccount({ fullName, email, password });
                      const homeRoute = getDefaultRouteForRole(data.user.role);
                      const targetRoute =
                        redirectTarget && isRouteAllowedForRole(data.user.role, redirectTarget)
                          ? redirectTarget
                          : homeRoute;

                      writeDemoSession({
                        email: data.user.email,
                        fullName: data.user.fullName,
                        role: data.user.role,
                        nextRoute: homeRoute,
                        statusLabel: "cadastro concluido"
                      });
                      navigate(targetRoute, { replace: true });
                    } catch (error) {
                      setFeedback({
                        tone: "error",
                        text: getMessage(error, "Nao foi possivel concluir a autenticacao.")
                      });
                    }
                  })();
                });
              }}
            >
              {mode === "register" ? (
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Nome completo</span>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                    className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Senha</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={isPending}
                className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground disabled:opacity-70"
              >
                {isPending ? "Processando..." : mode === "login" ? "Entrar na plataforma" : "Criar conta de aluno"}
              </button>
            </form>

            <p className="mt-6 text-sm text-paper-muted">
              {mode === "login" ? "Ainda nao tem acesso? " : "Ja tem uma conta? "}
              <button
                type="button"
                onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
                className="editorial-link"
              >
                {mode === "login" ? "Criar conta" : "Entrar"}
              </button>
            </p>

            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-paper-muted">
              Dica de demo: use <span className="text-gold">aluno@plataforma.local</span> com{" "}
              <span className="text-gold">premium123</span>.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-paper-muted">
              Operacao interna: <Link to="/" className="editorial-link">voltar ao site</Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default LoginPage;
