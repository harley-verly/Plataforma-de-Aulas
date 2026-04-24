import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import { platformConfig } from "@plataforma/config";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: `${platformConfig.name} | Staging`,
  description: "Plataforma proprietaria de aulas com catalogo, checkout, learning, studio, afiliados e admin."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
