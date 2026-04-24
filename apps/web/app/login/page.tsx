import { Suspense } from "react";

import { AuthPanel } from "../../components/auth-panel";

export default function LoginPage() {
  return (
    <div className="auth-page-wrap">
      <Suspense fallback={<div className="status-banner status-banner-success">Carregando acesso da plataforma...</div>}>
        <AuthPanel />
      </Suspense>
    </div>
  );
}
