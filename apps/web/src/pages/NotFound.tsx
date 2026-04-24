import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <div className="container-editorial flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-serif text-[160px] leading-none text-gold-soft md:text-[220px]">404</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Página não encontrada</p>
        <h1 className="mt-6 max-w-2xl font-serif text-3xl text-paper md:text-5xl text-balance">
          Esta página <em className="italic text-gold-soft">se perdeu</em> no caminho.
        </h1>
        <Link
          to="/"
          className="mt-10 hover-gold-shimmer px-7 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
        >
          Voltar à home
        </Link>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
