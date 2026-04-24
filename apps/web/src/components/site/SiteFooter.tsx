import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="mt-32 border-t border-ink-line bg-ink-soft">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Plataforma de Aulas</p>
            <h3 className="mt-6 font-serif text-4xl leading-[1.05] text-paper md:text-5xl">
              Estrutura proprietaria
              <br />
              para <em className="italic text-gold-soft">vender, ensinar e acompanhar.</em>
            </h3>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper-muted">
              Catalogo, checkout, area do aluno e operacao interna reunidos em uma experiencia unica,
              com linguagem premium do primeiro clique ate a entrega.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-paper-muted">Navegacao</p>
            <ul className="mt-6 space-y-3">
              {[
                { to: "/", label: "Inicio" },
                { to: "/catalog", label: "Catalogo" },
                { to: "/login", label: "Entrar" }
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="editorial-link text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-paper-muted">Contato</p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-paper-soft">
              ABA Solucoes e Tecnologia
              <br />
              aulas.abasolucoesetecnologia.com.br
              <br />
              <a href="mailto:operacao@abasolucoesetecnologia.com.br" className="editorial-link">
                operacao@abasolucoesetecnologia.com.br
              </a>
            </address>
            <div className="mt-6 flex gap-4 text-paper-muted">
              {[Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="rede social"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-rule mt-16" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-paper-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Plataforma de Aulas. Todos os direitos reservados.</p>
          <p>
            Frontend base <em className="italic text-gold-soft">Deluxe Vision</em>.
          </p>
        </div>
      </div>
    </footer>
  );
};
