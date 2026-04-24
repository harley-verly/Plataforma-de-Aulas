import type { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ");

export function ButtonLink({
  className,
  children,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      className={cx(
        "button-link",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function SurfaceCard({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cx("surface-card", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export function DataStrip({
  items
}: {
  items: Array<{ label: string; value: string; note: string }>;
}) {
  return (
    <div className="data-strip">
      {items.map((item) => (
        <SurfaceCard key={item.label} className="metric-card">
          <p className="metric-label">{item.label}</p>
          <p className="metric-value">{item.value}</p>
          <p className="metric-note">{item.note}</p>
        </SurfaceCard>
      ))}
    </div>
  );
}

export function Pill({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return <span className={cx("ui-pill", className)}>{children}</span>;
}
