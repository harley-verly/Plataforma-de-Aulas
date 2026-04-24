import { Suspense } from "react";

import { AuthPanel } from "../../components/auth-panel";
import { SiteShell } from "../../components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell
      eyebrow="acesso guiado"
      title="Entrar"
      subtitle="A primeira dobra agora concentra a atencao no acesso, no status da conta e no roteamento correto de cada perfil."
    >
      <section className="content-section">
        <div className="story-stage">
          <div className="story-stage-main">
            <p className="section-eyebrow">tela de entrada</p>
            <h2>Uma autenticacao que parece produto real desde a primeira dobra.</h2>
            <p>
              Inspirada na referencia observada na plataforma atual, a entrada ficou mais focada, escura, calorosa e
              preparada para conduzir aluno, produtor, afiliado, suporte e administracao pelas rotas certas.
            </p>
            <ul className="check-list">
              <li>roteamento por papel com redirecionamento seguro</li>
              <li>bloqueio de acesso anonimo nas areas protegidas</li>
              <li>visual mais alinhado ao clima premium da referencia</li>
            </ul>
          </div>

          <div className="story-stage-side">
            <span className="spotlight-badge">estado da demo</span>
            <h3>O que ja esta pronto para apresentar</h3>
            <div className="story-list">
              <div className="story-list-item">
                <span>aluno</span>
                <strong>learning com retomada e progresso</strong>
              </div>
              <div className="story-list-item">
                <span>produtor</span>
                <strong>studio com aprovacao e pipeline</strong>
              </div>
              <div className="story-list-item">
                <span>afiliado</span>
                <strong>links, extrato e comissao</strong>
              </div>
              <div className="story-list-item">
                <span>admin</span>
                <strong>acesso protegido por sessao demo</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <Suspense fallback={<div className="status-banner status-banner-success">Carregando autenticacao do staging...</div>}>
          <AuthPanel />
        </Suspense>
      </section>
    </SiteShell>
  );
}
