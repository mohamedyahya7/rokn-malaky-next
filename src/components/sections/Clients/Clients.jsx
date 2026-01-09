"use client";

import { InfiniteScrollClients } from "./InfiniteScrollClients";
import { siteData } from "@/lib/data";

const { clients } = siteData;

function ClientsSection() {
  return (
    <section
      id="clients"
      className="py-24 bg-linear-to-b from-white to-slate-50"
    >
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-(--primary)/5 blur-3xl rounded-full -z-10" />

          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-(--primary) uppercase bg-(--primary)/10 rounded-full">
            شركاؤنا
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-(--primary) mb-6 tracking-tight">
            شركاء <span className="text-slate-800">النجاح</span>
          </h2>

          <div className="w-24 h-1.5 bg-linear-to-r from-transparent via-(--primary) to-transparent mx-auto mb-8 rounded-full" />

          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            نفخر بثقة كبرى الشركات والمؤسسات التي تعاونا معها في توريد الكوادر
            البشرية، لبناء مستقبل واعد معاً.
          </p>
        </div>
      </div>

      <InfiniteScrollClients clients={clients} />
      <InfiniteScrollClients clients={clients} direction="right" />
    </section>
  );
}

export default ClientsSection;
