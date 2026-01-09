import type { Metadata } from "next";
import { Cairo, El_Messiri } from "next/font/google"; // Using Cairo and El Messiri fonts
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-cairo",
});

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
});

export const metadata: Metadata = {
  title: "شركة الركن الملكي للتوظيف",
  description: "خدمات توظيف واستقدام وتعقيب في دول الخليج",
  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
     
      <body className={`${cairo.variable} ${elMessiri.variable} font-sans bg-slate-50 text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
