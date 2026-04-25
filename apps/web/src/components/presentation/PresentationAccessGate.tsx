import { FormEvent, ReactNode, useMemo, useState } from "react";
import { ArrowRight, Loader2, Mail, Phone, User } from "lucide-react";

type PresentationAccessLeadInput = {
  name: string;
  email: string;
  phone: string;
};

type Props = {
  onSubmit: (lead: PresentationAccessLeadInput) => Promise<void>;
  isSubmitting: boolean;
  errorMessage: string | null;
};

export const PresentationAccessGate = ({ onSubmit, isSubmitting, errorMessage }: Props) => {
  const [form, setForm] = useState<PresentationAccessLeadInput>({
    name: "",
    email: "",
    phone: ""
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const isReady = useMemo(
    () =>
      form.name.trim().length >= 3 &&
      form.email.trim().includes("@") &&
      form.phone.replace(/\D/g, "").length >= 10,
    [form]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReady) {
      setLocalError("Preencha nome, telefone e e-mail válidos para liberar a apresentação.");
      return;
    }

    setLocalError(null);
    await onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim()
    });
  };

  const feedback = errorMessage ?? localError;

  return (
    <section className="container-editorial py-12 md:py-16">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border border-ink-line bg-ink-soft p-6 md:p-8 xl:p-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Apresentação comercial</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] text-paper md:text-7xl">
            Libere a proposta com seus dados e acompanhe a condição comercial em tempo real.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper-soft">
            O contador das 24 horas começa somente após o registro do seu contato. Assim, a proposta
            fica salva neste navegador e pode ser retomada do mesmo ponto sem perder a condição vigente.
          </p>

          <form className="mt-10 grid gap-5" onSubmit={handleSubmit}>
            <Field
              label="Nome"
              icon={<User className="h-4 w-4" />}
              value={form.name}
              onChange={(value) => setForm((previous) => ({ ...previous, name: value }))}
              placeholder="Seu nome completo"
              autoComplete="name"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Telefone"
                icon={<Phone className="h-4 w-4" />}
                value={form.phone}
                onChange={(value) => setForm((previous) => ({ ...previous, phone: value }))}
                placeholder="(82) 98109-3783"
                autoComplete="tel"
              />
              <Field
                label="E-mail"
                icon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={(value) => setForm((previous) => ({ ...previous, email: value }))}
                placeholder="voce@empresa.com.br"
                autoComplete="email"
              />
            </div>

            <div className="rounded-sm border border-ink-line bg-background/60 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">O que acontece ao liberar</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <AccessMetric
                  title="1. Registro do contato"
                  description="Nome, telefone e e-mail seguem para o CRM do Portal de Leads."
                />
                <AccessMetric
                  title="2. Início da condição"
                  description="A régua comercial começa em 24 horas a partir desta liberação."
                />
                <AccessMetric
                  title="3. Retomada garantida"
                  description="Este navegador salva o avanço da proposta e o capítulo onde você parou."
                />
              </div>
            </div>

            {feedback && (
              <div className="border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={!isReady || isSubmitting}
              className={[
                "hover-gold-shimmer inline-flex items-center justify-center gap-3 px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground shadow-gold-glow transition-opacity",
                !isReady || isSubmitting ? "cursor-not-allowed opacity-70" : ""
              ].join(" ")}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Registrando acesso
                </>
              ) : (
                <>
                  Liberar apresentação
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <aside className="border border-gold/20 bg-gradient-ink p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Acesso protegido</p>
          <h2 className="mt-3 font-serif text-3xl text-paper">
            A proposta completa só aparece depois da liberação.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-paper-muted">
            Enquanto os dados do cliente não forem registrados, a apresentação não mostra preço,
            prazo, condição comercial nem detalhes da oferta.
          </p>

          <div className="mt-6 space-y-4">
            <OfferVisibilityCard
              title="O que fica oculto"
              summary="Valores, marcos de tempo, prazo de beta, prazo final e janela comercial só aparecem depois do lead entrar no CRM."
            />
            <OfferVisibilityCard
              title="Quando libera"
              summary="Assim que nome, telefone e e-mail forem enviados com sucesso, a proposta é destravada e o contador começa."
            />
            <OfferVisibilityCard
              title="Como retoma depois"
              summary="O navegador guarda o avanço da proposta para o cliente continuar do mesmo ponto já com a condição ativa."
            />
          </div>
        </aside>
      </div>
    </section>
  );
};

const Field = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  autoComplete
}: {
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
}) => (
  <label className="grid gap-2">
    <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{label}</span>
    <span className="flex items-center gap-3 border border-ink-line bg-background/80 px-4 py-4 text-paper-soft transition-colors focus-within:border-gold/40">
      <span className="text-paper-muted">{icon}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-transparent text-base text-paper outline-none placeholder:text-paper-muted/60"
      />
    </span>
  </label>
);

const AccessMetric = ({ title, description }: { title: string; description: string }) => (
  <div className="border border-ink-line bg-background/50 px-4 py-4">
    <p className="text-sm text-paper">{title}</p>
    <p className="mt-2 text-sm leading-relaxed text-paper-muted">{description}</p>
  </div>
);

const OfferVisibilityCard = ({
  title,
  summary
}: {
  title: string;
  summary: string;
}) => (
  <div className="border border-ink-line bg-background/60 px-4 py-4">
    <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{title}</p>
    <p className="mt-2 text-sm leading-relaxed text-paper-muted">{summary}</p>
  </div>
);
