import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export type SiteLayoutMode = "default" | "proposal";

export const SiteLayout = ({
  children,
  mode = "default"
}: {
  children: ReactNode;
  mode?: SiteLayoutMode;
}) => (
  <div className="flex min-h-screen flex-col bg-background editorial-grain">
    <SiteHeader mode={mode} />
    <main className="flex-1">{children}</main>
    <SiteFooter mode={mode} />
  </div>
);
