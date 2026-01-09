'use client';

import { siteData } from '@/lib/data';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { useAccordion } from '@/hooks/useAccordion';

export default function FAQ() {
  const { faqs } = siteData;
  const { toggle, isOpen } = useAccordion(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-cairo text-[var(--secondary)] mb-4">الأسئلة الشائعة</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            إجابات على أهم استفساراتكم حول خدماتنا
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const active = isOpen(idx);
            return (
              <div
                key={idx}
                className={`bg-slate-50 rounded-2xl border transition-all duration-300 ${
                  active ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-100 hover:border-blue-200'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-right p-6 md:p-8 flex items-center justify-between gap-4"
                  aria-expanded={active}
                >
                  <div className="flex items-start gap-3">
                    <FaQuestionCircle className={`shrink-0 mt-1 transition-colors ${active ? 'text-[var(--primary)]' : 'text-[var(--accent)]'}`} size={20} />
                    <h3 className={`text-lg font-bold transition-colors ${active ? 'text-[var(--primary)]' : 'text-[var(--secondary)]'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <FaChevronDown 
                    className={`shrink-0 transition-transform duration-300 ${active ? 'rotate-180 text-[var(--primary)]' : 'text-slate-400'}`} 
                    size={16} 
                  />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 md:p-8 pt-0 md:pt-0 text-slate-600 leading-relaxed pr-14">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

