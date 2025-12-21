import { siteData } from '@/lib/data';
import { FaBullseye } from 'react-icons/fa';

export default function About() {
  const { about_us } = siteData;

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-[var(--primary)] text-sm font-bold rounded-full mb-2">
              من نحن
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--secondary)] leading-tight">
              {about_us.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg text-justify">
              {about_us.description}
            </p>
          </div>

          {/* Mission Box */}
          <div className="bg-blue-50/50 p-8 rounded-[2rem] border-r-4 border-[var(--primary)] relative">
            <div className="absolute top-6 right-6 text-[var(--primary)] opacity-20">
              <FaBullseye size={48} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4 flex items-center gap-3">
                <FaBullseye className="text-[var(--primary)]" size={28} />
                {about_us.mission.title}
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {about_us.mission.content}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
