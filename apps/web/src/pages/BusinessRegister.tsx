import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { toast } from "sonner";

const steps = ["Negócio", "Contato", "Apresentação", "Confirmação"] as const;

const BusinessRegister = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    phone: "",
    email: "",
    instagram: "",
    site: "",
    bio: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro recebido. Nossa equipe responderá em até 5 dias úteis.");
    setStep(steps.length - 1);
  };

  const Field = ({ label, ...props }: any) => (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">{label}</span>
      <input
        {...props}
        className="mt-2 h-12 w-full border border-ink-line bg-ink-soft px-4 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
      />
    </label>
  );

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-24 md:pt-20">
        <SectionLabel number="04">Cadastro de Negócio</SectionLabel>
        <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
          Conte-nos sobre <em className="italic text-gold-soft">o seu negócio.</em>
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <ol className="space-y-1">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-4 border-l-2 py-3 pl-5 transition-colors ${
                    i === step ? "border-gold text-paper" : i < step ? "border-gold/50 text-paper-soft" : "border-ink-line text-paper-muted"
                  }`}
                >
                  <span className="font-serif text-2xl text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[11px] uppercase tracking-[0.25em]">{s}</span>
                  {i < step && <Check className="ml-auto h-4 w-4 text-gold" />}
                </li>
              ))}
            </ol>
          </aside>

          <form onSubmit={submit} className="lg:col-span-8 border border-ink-line bg-ink-soft p-8 md:p-10">
            {step === 0 && (
              <div className="grid gap-6">
                <Field label="Nome do negócio" value={data.name} onChange={(e: any) => setData({ ...data, name: e.target.value })} required />
                <Field label="Categoria" placeholder="Ex.: Gastronomia" value={data.category} onChange={(e: any) => setData({ ...data, category: e.target.value })} required />
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Descrição completa</span>
                  <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
                    placeholder="O que faz, há quanto tempo, o que torna especial..."
                    required
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Telefone" value={data.phone} onChange={(e: any) => setData({ ...data, phone: e.target.value })} required />
                <Field label="E-mail" type="email" value={data.email} onChange={(e: any) => setData({ ...data, email: e.target.value })} required />
                <Field label="Instagram" value={data.instagram} onChange={(e: any) => setData({ ...data, instagram: e.target.value })} />
                <Field label="Site" value={data.site} onChange={(e: any) => setData({ ...data, site: e.target.value })} />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Mini-bio (até 140 caracteres)</span>
                  <textarea
                    rows={3}
                    maxLength={140}
                    value={data.bio}
                    onChange={(e) => setData({ ...data, bio: e.target.value })}
                    className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
                    placeholder="Frase curta que descreve a essência."
                    required
                  />
                </label>
                <div className="border border-dashed border-ink-line p-8 text-center text-sm text-paper-muted">
                  Arraste uma imagem aqui ou clique para selecionar
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gold">JPG ou PNG · até 4MB</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold text-gold">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-6 font-serif text-3xl text-paper">Cadastro recebido</h2>
                <p className="mx-auto mt-4 max-w-md text-paper-soft">
                  Nossa equipe editorial entrará em contato em até 5 dias úteis para alinhar fotos,
                  validar informações e publicar seu negócio na vitrine.
                </p>
              </div>
            )}

            {step < 3 && (
              <div className="mt-10 flex items-center justify-between border-t border-ink-line pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper-muted disabled:opacity-30 hover:text-paper"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Voltar
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="hover-gold-shimmer inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
                  >
                    Próximo <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="hover-gold-shimmer inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
                  >
                    Enviar cadastro <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default BusinessRegister;
