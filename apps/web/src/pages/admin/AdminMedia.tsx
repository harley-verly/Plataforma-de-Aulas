import { Upload } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import hero from "@/assets/hero-entrepreneur.jpg";
import event from "@/assets/event-feature.jpg";
import about from "@/assets/about-history.jpg";
import c1 from "@/assets/course-1.jpg";
import c2 from "@/assets/course-2.jpg";
import c3 from "@/assets/course-3.jpg";
import b1 from "@/assets/biz-1.jpg";
import b2 from "@/assets/biz-2.jpg";
import b3 from "@/assets/biz-3.jpg";
import b4 from "@/assets/biz-4.jpg";

const media = [
  { src: hero, name: "hero-entrepreneur.jpg", size: "1.8 MB" },
  { src: event, name: "event-feature.jpg", size: "2.1 MB" },
  { src: about, name: "about-history.jpg", size: "1.6 MB" },
  { src: c1, name: "course-1.jpg", size: "1.2 MB" },
  { src: c2, name: "course-2.jpg", size: "1.3 MB" },
  { src: c3, name: "course-3.jpg", size: "1.1 MB" },
  { src: b1, name: "biz-1.jpg", size: "1.4 MB" },
  { src: b2, name: "biz-2.jpg", size: "1.2 MB" },
  { src: b3, name: "biz-3.jpg", size: "1.5 MB" },
  { src: b4, name: "biz-4.jpg", size: "1.3 MB" },
];

const AdminMedia = () => (
  <AdminLayout
    title="Biblioteca de mídia"
    subtitle="Imagens, vídeos e documentos disponíveis para o portal."
    action={
      <button className="hover-gold-shimmer inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground">
        <Upload className="h-3.5 w-3.5" /> Enviar arquivos
      </button>
    }
  >
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {media.map((m) => (
        <div key={m.name} className="group border border-ink-line bg-ink-soft transition-all hover:border-gold/40">
          <div className="aspect-square overflow-hidden">
            <img src={m.src} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="border-t border-ink-line p-4">
            <p className="truncate text-xs text-paper">{m.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-paper-muted">{m.size}</p>
          </div>
        </div>
      ))}
    </div>
  </AdminLayout>
);

export default AdminMedia;
