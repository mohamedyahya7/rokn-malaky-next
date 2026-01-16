import Image from 'next/image';
import { siteData } from '@/lib/data';

export default function Clients() {
  const { clients } = siteData;

  return (
    <section id="clients" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--secondary)] mb-4">شركاء النجاح</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            نفخر بثقة كبرى الشركات والمؤسسات التي تعاوننا معها
          </p>
        </div>

        <div className="grid grid-cols-4 md:flex md:flex-wrap justify-center items-center gap-3 md:gap-8">
          {clients.map((client, idx) => (
            <div 
              key={idx}
              className="group relative bg-white border border-slate-100 w-full h-20 md:w-56 md:h-40 rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center p-2 md:p-6 hover:shadow-lg hover:border-[var(--primary)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-full">
                <Image 
                  src={client.logo} 
                  alt={client.name}
                  fill
                  className="object-contain filter grayscale-0 opacity-100 md:grayscale md:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
