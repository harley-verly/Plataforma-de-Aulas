import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { toast } from "sonner";

const Contact = () => {
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24 md:pt-20">
        <SectionLabel number="05">Contato</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
          Vamos <em className="italic text-gold-soft">conversar.</em>
        </h1>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Mensagem enviada. Responderemos em breve.");
              setData({ name: "", email: "", subject: "", message: "" });
            }}
            className="lg:col-span-7 space-y-6 border border-ink-line bg-ink-soft p-8 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label>
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Nome</span>
                <input
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>
              <label>
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">E-mail</span>
                <input
                  required
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Assunto</span>
              <input
                required
                value={data.subject}
                onChange={(e) => setData({ ...data, subject: e.target.value })}
                className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Mensagem</span>
              <textarea
                required
                rows={6}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
            >
              Enviar mensagem
            </button>
          </form>

          <aside className="lg:col-span-5 space-y-8">
            <div className="border border-ink-line bg-ink-soft p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Sede</p>
              <p className="mt-4 font-serif text-2xl text-paper">
                Rua das Conquistas, 1998
                <br />
                Centro — sua cidade, BR
              </p>
              <ul className="mt-8 space-y-4 text-sm text-paper-soft">
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> (11) 4002-8922</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> contato@acmb.org.br</li>
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold" /> Seg–Sex · 09h às 18h</li>
              </ul>
            </div>
            <div className="aspect-[4/3] overflow-hidden border border-ink-line bg-ink-soft">
              <iframe
                title="Mapa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6500%2C-23.5600%2C-46.6300%2C-23.5400&layer=mapnik"
                className="h-full w-full opacity-80 grayscale"
              />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
