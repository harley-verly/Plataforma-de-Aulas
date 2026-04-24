import { useParams, Link } from "react-router-dom";
import { Globe, Instagram, Mail, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { businesses } from "@/data/portal";

const BusinessDetail = () => {
  const { slug } = useParams();
  const biz = businesses.find((b) => b.slug === slug);
  if (!biz) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32 text-center">
          <h1 className="font-serif text-4xl text-paper">Negócio não encontrado</h1>
          <Link to="/comunidade" className="mt-6 inline-block editorial-link">Voltar à comunidade</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-12 md:pt-20">
        <SectionLabel>{biz.category}</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl leading-[0.98] text-paper md:text-7xl text-balance">{biz.name}</h1>
            <p className="mt-8 font-serif text-2xl leading-snug text-paper-soft md:text-3xl">{biz.shortBio}</p>
            <p className="mt-6 text-base leading-relaxed text-paper-soft">{biz.description}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden border border-ink-line">
              <img src={biz.image} alt={biz.name} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-24">
        <div className="grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Phone, label: "Telefone", value: biz.contact.phone },
            { Icon: Mail, label: "E-mail", value: biz.contact.email },
            biz.contact.instagram && { Icon: Instagram, label: "Instagram", value: biz.contact.instagram },
            biz.contact.site && { Icon: Globe, label: "Site", value: biz.contact.site },
          ]
            .filter(Boolean)
            .map((c: any, i) => (
              <div key={i} className="bg-ink-soft p-6">
                <c.Icon className="h-4 w-4 text-gold" />
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-paper-muted">{c.label}</p>
                <p className="mt-2 text-paper">{c.value}</p>
              </div>
            ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default BusinessDetail;
