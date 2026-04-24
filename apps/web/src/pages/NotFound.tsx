import { Link } from "react-router-dom";

import { SiteLayout } from "@/components/site/SiteLayout";

const NotFound = () => {
  return (
    <SiteLayout>
      <div className="container-editorial py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">404</p>
        <h1 className="mt-6 font-serif text-5xl text-paper">Pagina nao encontrada</h1>
        <p className="mt-6 text-base text-paper-muted">
          O caminho solicitado nao faz parte desta versao da plataforma.
        </p>
        <Link to="/" className="mt-8 inline-block editorial-link text-[11px] uppercase tracking-[0.25em]">
          Voltar para a home
        </Link>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
