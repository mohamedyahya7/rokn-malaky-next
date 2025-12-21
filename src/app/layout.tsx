import type { Metadata } from "next";
import { Cairo } from "next/font/google"; // Using Cairo font
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"], // Explicit weights used in original
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "شركة الركن الملكي للتوظيف",
  description: "خدمات توظيف واستقدام وتعقيب في دول الخليج",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans bg-slate-50 text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
