import { useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T extends { slug?: string; status?: string }> = {
  title: string;
  subtitle?: string;
  items: T[];
  columns: Column<T>[];
  newLabel?: string;
  formFields: { key: string; label: string; type?: "text" | "textarea"; placeholder?: string }[];
};

export function AdminCrudPage<T extends { slug?: string; status?: string; title?: string; name?: string }>({
  title,
  subtitle,
  items,
  columns,
  newLabel = "Novo registro",
  formFields,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(items);
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = list.filter((it) => {
    const v = (it.title || it.name || "").toString().toLowerCase();
    return v.includes(query.toLowerCase());
  });

  const handleDelete = (slug?: string) => {
    setList((l) => l.filter((i) => i.slug !== slug));
    toast.success("Registro removido.");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Alterações salvas com sucesso.");
    setOpen(false);
    setEditing(null);
  };

  return (
    <AdminLayout
      title={title}
      subtitle={subtitle}
      action={
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              onClick={() => setEditing(null)}
              className="hover-gold-shimmer inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
            >
              <Plus className="h-3.5 w-3.5" /> {newLabel}
            </button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xl overflow-y-auto bg-ink-soft border-l border-ink-line">
            <SheetHeader>
              <SheetTitle className="font-serif text-3xl text-paper">
                {editing ? "Editar registro" : newLabel}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSave} className="mt-8 space-y-5">
              {formFields.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea
                      defaultValue={(editing as any)?.[f.key] ?? ""}
                      placeholder={f.placeholder}
                      rows={5}
                      className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
                    />
                  ) : (
                    <input
                      defaultValue={(editing as any)?.[f.key] ?? ""}
                      placeholder={f.placeholder}
                      className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                    />
                  )}
                </label>
              ))}
              <div className="border border-dashed border-ink-line p-6 text-center text-sm text-paper-muted">
                Arraste uma imagem ou clique para enviar
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-paper-muted hover:text-paper"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="hover-gold-shimmer px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
                >
                  Salvar
                </button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      }
    >
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-ink-line pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="h-11 w-full border border-ink-line bg-ink-soft pl-11 pr-4 text-sm text-paper placeholder:text-paper-muted focus:border-gold focus:outline-none"
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          {filtered.length} {filtered.length === 1 ? "registro" : "registros"}
        </span>
      </div>

      <div className="overflow-hidden border border-ink-line">
        <table className="w-full text-sm">
          <thead className="bg-ink-soft text-left">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="border-b border-ink-line px-5 py-4 text-[10px] uppercase tracking-[0.3em] text-paper-muted"
                >
                  {c.label}
                </th>
              ))}
              <th className="border-b border-ink-line px-5 py-4 text-right text-[10px] uppercase tracking-[0.3em] text-paper-muted">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={(it.slug as string) ?? Math.random()} className="border-b border-ink-line/60 transition-colors hover:bg-ink-soft/50">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-5 py-4 text-paper ${c.className ?? ""}`}>
                    {c.render ? c.render(it) : ((it as any)[c.key] as React.ReactNode)}
                  </td>
                ))}
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditing(it);
                        setOpen(true);
                      }}
                      className="border border-ink-line p-2 text-paper-muted transition-colors hover:border-gold hover:text-gold"
                      aria-label="Editar"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(it.slug)}
                      className="border border-ink-line p-2 text-paper-muted transition-colors hover:border-destructive hover:text-destructive"
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export const StatusBadge = ({ status }: { status?: string }) => (
  <span
    className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] ${
      status === "publicado"
        ? "border-gold/40 text-gold"
        : "border-ink-line text-paper-muted"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${status === "publicado" ? "bg-gold" : "bg-paper-muted"}`}
    />
    {status ?? "—"}
  </span>
);
