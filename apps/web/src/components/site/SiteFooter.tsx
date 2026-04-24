import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-ink-line bg-ink-soft mt-32">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Associação ACMB</p>
            <h3 className="mt-6 font-serif text-4xl leading-[1.05] text-paper md:text-5xl">
              Comunidade <em className="italic text-gold-soft">empreendedora,</em>
              <br />
              propósito coletivo.
            </h3>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper-muted">
              Há mais de 25 anos conectando pessoas, negócios e oportunidades em prol do desenvolvimento
              da nossa comunidade.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-paper-muted">Navegação</p>
            <ul className="mt-6 space-y-3">
              {[
                { to: "/institucional", label: "Institucional" },
                { to: "/eventos", label: "Eventos" },
                { to: "/cursos", label: "Cursos" },
                { to: "/comunidade", label: "Comunidade" },
                { to: "/contato", label: "Contato" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="editorial-link text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-paper-muted">Contato</p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-paper-soft">
              Rua das Conquistas, 1998
              <br />
              Centro — sua cidade, BR
              <br />
              <a href="mailto:contato@acmb.org.br" className="editorial-link">
                contato@acmb.org.br
              </a>
              <br />
              (11) 4002-8922
            </address>
            <div className="mt-6 flex gap-4 text-paper-muted">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
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
          <p>© {new Date().getFullYear()} ACMB. Todos os direitos reservados.</p>
          <p>
            Desenhado <em className="italic text-gold-soft">com cuidado</em>.
          </p>
        </div>
      </div>
    </footer>
  );
};
