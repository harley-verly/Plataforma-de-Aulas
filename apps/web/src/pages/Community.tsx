import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { BusinessCard } from "@/components/site/BusinessCard";
import { GoldButton } from "@/components/site/GoldButton";
import { businesses } from "@/data/portal";

const Community = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const categories = useMemo(() => ["Todas", ...new Set(businesses.map((b) => b.category))], []);
  const list = useMemo(() => {
    return businesses.filter((b) => {
      const matchCat = cat === "Todas" || b.category === cat;
      const matchQ = b.name.toLowerCase().includes(query.toLowerCase()) || b.shortBio.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, cat]);

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-12 md:pt-20">
        <SectionLabel number="04">Comunidade Empreendedora</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
              A vitrine viva dos negócios <em className="italic text-gold-soft">da nossa cidade.</em>
            </h1>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="text-lg text-paper-soft">
              Conheça empreendedores associados, encontre serviços próximos e descubra histórias por trás de
              cada marca local.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/comunidade/cadastrar"
            className="hover-gold-shimmer px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
          >
            Cadastrar meu negócio →
          </Link>
        </div>
      </section>

      <section className="container-editorial pb-24">
        <div className="flex flex-col gap-6 border-b border-ink-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  cat === c ? "bg-gold text-gold-foreground" : "text-paper-muted hover:text-paper"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar negócio..."
              className="h-11 w-full border border-ink-line bg-ink-soft pl-11 pr-4 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((b) => (
            <BusinessCard key={b.slug} business={b} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-20 text-center text-paper-muted">Nenhum negócio encontrado para sua busca.</p>
        )}
      </section>

      <section className="container-editorial pb-24">
        <div className="border border-gold/20 bg-gradient-ink p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-paper md:text-5xl text-balance">
            Tem um negócio? <em className="italic text-gold-soft">Entre para a vitrine.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-paper-soft">
            Cadastro gratuito para associados. Análise editorial em até 5 dias úteis.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldButton to="/comunidade/cadastrar">Cadastrar meu negócio</GoldButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Community;
