import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export const GoldButton = ({ to, href, children, variant = "primary", className }: Props) => {
  const base =
    "group relative inline-flex items-center gap-3 px-7 py-4 text-[11px] uppercase tracking-[0.25em] transition-all duration-500";
  const styles =
    variant === "primary"
      ? "hover-gold-shimmer text-gold-foreground shadow-gold-glow"
      : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10";

  const Inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </>
  );

  if (to) return <Link to={to} className={cn(base, styles, className)}>{Inner}</Link>;
  if (href) return <a href={href} className={cn(base, styles, className)}>{Inner}</a>;
  return <button className={cn(base, styles, className)}>{Inner}</button>;
};
