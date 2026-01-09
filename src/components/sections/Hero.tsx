'use client';

import Image from 'next/image';
import { siteData } from '@/lib/data';

export default function Hero() {
  const { hero } = siteData;

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center pt-10 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Image */}
        <div className="relative w-full h-full md:hidden">
          <Image 
            src="/assets/header.jpeg"
            alt="Al-Rokon Al-Malaky Hero" 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-[60%_50%]"
          />
        </div>

        {/* Desktop Image */}
        <div className="relative w-full h-full hidden md:block">
          <Image 
            src="/assets/header1.jpg"
            alt="Al-Rokon Al-Malaky Hero" 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient Overlay: Multi-layer for better contrast */}
        <div className="absolute inset-0 bg-slate-900/10 md:bg-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-br from-(--secondary)/60 via-(--primary)/30 to-white/30 md:to-white/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-transparent to-transparent md:hidden"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Main Content */}
          <div className="flex-1 text-right animate-slide-left">
            <h1 className="text-6xl md:text-8xl font-black  text-white  mb-6 font-el-messiri leading-tight drop-shadow-2xl">
              <span style={{ animationDelay: '200ms' }}>
                {hero.title.split('..')[0]}..
              </span> 
              <br />
              <span className="text-[var(--primary)] drop-shadow-[10px_1px_15px_rgba(255,255,255,0.6)] font-cairo text-2xl md:text-3xl">
                {hero.title.split('..')[1]}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-4 max-w-2xl leading-relaxed font-semibold drop-shadow-lg">
              {hero.description}
            </p>
          </div>

          {/* Side Space/Optional Decoration */}
          <div className="flex-1 hidden lg:block"></div>
        </div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 md:mt-10">
          {hero.highlights.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-black/15 backdrop-blur-2xl p-3 md:p-6 rounded-3xl border border-white/20 shadow-2xl animate-slide-up text-right"
              style={{ animationDelay: `${(idx + 1) * 200}ms` }}
            >
              <div className="flex flex-row-reverse items-center justify-center mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-extrabold text-white">{item.title}</h3>
              </div>
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-bold text-center">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
