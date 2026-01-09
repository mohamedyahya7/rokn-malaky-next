'use client';

import { siteData } from '@/lib/data';
import { FaUsers, FaCheckCircle, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import MagicButton from '@/components/ui/MagicButton';
import { useAccordion } from '@/hooks/useAccordion';

export default function Services() {
  const { services } = siteData;
  const { toggle, isOpen } = useAccordion(null); // All closed by default on mobile

  // Simple function to format WhatsApp
  const formatWhatsApp = (num: string) => `https://wa.me/2${num}`;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--secondary)] mb-4">خدماتنا المتكاملة</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            حلول احترافية للتوظيف والاستقدام والتعقيب تناسب احتياجاتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {services.map((service, index) => {
            const active = isOpen(index);
            
            return (
              <article 
                key={service.id}
                className={`group border-x-1 bg-[var(--card-bg)] rounded-[var(--radius)] shadow-[var(--shadow)] border-y-[3px] border-[var(--primary)] hover:border-y-[5px] flex flex-col transition-all duration-300 relative overflow-hidden ${
                  active ? 'shadow-xl' : 'hover:scale-[1.02] md:hover:scale-105 md:hover:translate-y-2'
                }`}
              >
                {/* ID Badge - Hidden on mobile accordion for cleaner look or kept as background */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-xl font-bold text-[var(--primary)] opacity-30 z-0">
                  {service.id}
                </div>

                {/* Mobile Trigger / Header */}
                <div 
                  onClick={() => {
                    if (window.innerWidth < 768) toggle(index);
                  }}
                  className="relative z-10 p-6 md:p-4 cursor-pointer md:cursor-default flex items-center justify-between gap-4"
                >
                  <div className="flex-grow min-h-[60px]">
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-1">
                      {service.title}
                    </h3>
                    {service.target_audience && (
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold">
                        <FaUsers size={12} />
                        {service.target_audience}
                      </div>
                    )}
                  </div>
                  
                  {/* Accordion Icon - Only visible on mobile */}
                  <div className="md:hidden">
                    <FaChevronDown 
                      className={`text-[var(--primary)] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  </div>
                </div>

                {/* Collapsible Content */}
                <div 
                  className={`relative z-10 transition-all flex flex-col items-start justify-between duration-300 ease-in-out md:block overflow-hidden ${
                    active ? 'max-h-[1000px] opacity-100 flex flex-col items-start justify-between' : 'max-h-0 md:max-h-none opacity-0 md:opacity-100'
                  }`}
                >
                  <div className="px-6 pb-6 md:px-4 md:pb-4  h-full">
                    <p className="text-slate-600 text-sm leading-relaxed  mb-6 md:min-h-[60px]">
                      {service.description}
                    </p>

                    <h4 className="text-sm font-bold text-[var(--secondary)] mb-3 pb-2 border-b border-slate-100 inline-block w-fit">
                      المميزات:
                    </h4>
                    <ul className="space-y-2 mb-6 md:min-h-[240px] items-start justify-between flex flex-col flex-wrap">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Action */}
                    <div className="mb-0 pt-4  flex justify-center">
                      <MagicButton 
                        href={formatWhatsApp(service.contact_number)}
                        target="_blank"
                        rel="noopener noreferrer"
                        animationTrigger="group-hover"
                      >
                        <span style={{ fontFamily: 'var(--font-cairo)'}}>تـــــواصل معنا</span>
                        <FaWhatsapp size={28} color='#25D366' />
                      </MagicButton>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

