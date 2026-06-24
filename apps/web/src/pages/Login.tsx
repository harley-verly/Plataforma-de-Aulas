import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { canAccessAdmin, readDemoSession, saveDemoSession } from "@/lib/auth-session";
import { loginWithDemoCredentials } from "@/lib/platform-api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/admin";
  const existingSession = readDemoSession();
  const [email, setEmail] = useState("admin@plataforma.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (canAccessAdmin(existingSession) && redirectTo.startsWith("/admin")) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await loginWithDemoCredentials({ email, password });
      saveDemoSession(response.session);
      navigate(canAccessAdmin(response.session) ? redirectTo : response.session.nextRoute || "/", { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Nao foi possivel entrar agora.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">ACMB / Acesso</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-paper md:text-7xl">Entrar na plataforma</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-paper-muted">
              Use uma credencial demo autorizada para acessar as areas internas de gestao.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border border-ink-line bg-ink-soft p-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

            <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
