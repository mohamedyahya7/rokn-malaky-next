import type { Metadata } from "next";
import { Cairo } from "next/font/google"; // Using Cairo font
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-cairo",
});

/* 
const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
});
*/

export const metadata: Metadata = {
  title: {
    default: "شركة الركن الملكي للتوظيف والاستقدام | Al-Rokon Al-Malaky",
    template: "%s | الركن الملكي",
  },
  description: "شركة الركن الملكي الرائدة في خدمات التوظيف والاستقدام والتعقيب في السعودية ودول الخليج. نوفر أفضل الكفاءات والحلول المتكاملة للشركات والأفراد.",
  keywords: ["توظيف", "استقدام", "تعقيب", "السعودية", "الخليج", "فرص عمل", "وظائف شاغرة", "موارد بشرية", "الركن الملكي"],
  authors: [{ name: "الركن الملكي" }],
  creator: "Traiple A \ Mo Yahya",
  publisher: "Traiple A \ Mo Yahya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elroknelmalky.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "شركة الركن الملكي للتوظيف والاستقدام",
    description: "حلول التوظيف والاستقدام المتكاملة في السعودية ودول الخليج",
    url: 'https://elroknelmalky.com',
    siteName: 'الركن الملكي',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/icon.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "شركة الركن الملكي للتوظيف والاستقدام",
    description: "أفضل خدمات التوظيف والاستقدام في المنطقة",
    images: ['/icon.jpg'],
  },
  verification: {
    google: "U4LDRK7wCgHMk0a1YtlLi7NjuRV2BwERwnhay9Nei50",
  },
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
     
      <body className={`${cairo.variable} font-sans bg-slate-50 text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
