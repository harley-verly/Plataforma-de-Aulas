import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const SectionLabel = ({
  number,
  children,
  className,
}: {
  number?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-gold", className)}>
    {number && <span className="font-serif text-base normal-case tracking-normal text-gold-soft">{number}</span>}
    <span className="h-px w-10 bg-gold/60" />
    <span>{children}</span>
  </div>
);
