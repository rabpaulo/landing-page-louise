import type { Metadata } from "next";
import "../src/index.css";
import "../src/App.css";

export const metadata: Metadata = {
  title: "Valenne Lingerie | Para sentir. Para ser você.",
  description: "Descubra a coleção Valenne: peças delicadas, conforto e leveza para o seu momento.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
