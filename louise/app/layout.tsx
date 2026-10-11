import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../src/index.css";
import "../src/App.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-page-louise.vercel.app"),
  title: "Maré Íntima — Conceito de Experiência Digital",
  description: "Projeto conceitual independente desenvolvido como demonstração técnica de desenvolvimento web.",
  openGraph: {
    title: "Maré Íntima — Conceito de Experiência Digital",
    description: "Projeto conceitual independente desenvolvido como demonstração técnica de desenvolvimento web.",
    url: "https://landing-page-louise.vercel.app",
    siteName: "Maré Íntima · Conceito independente",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/hero.webp", alt: "Conjunto de lingerie vinho com renda floral, fotografado sobre tecido claro." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maré Íntima — Conceito de Experiência Digital",
    description: "Projeto conceitual independente desenvolvido como demonstração técnica de desenvolvimento web.",
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
