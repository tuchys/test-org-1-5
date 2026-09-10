import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FashionKardex — Clothes Store CRM",
  description:
    "Manage your clothes store's customers, inventory, sales, and more with FashionKardex.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
