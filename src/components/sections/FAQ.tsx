import { siteData } from '@/lib/data';
import { FaQuestionCircle } from 'react-icons/fa';

export default function FAQ() {
  const { faqs } = siteData;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--secondary)] mb-4">الأسئلة الشائعة</h2>

            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              إجابات على أهم استفساراتكم حول خدماتنا
            </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors"
            >
              <h3 className="text-lg font-bold text-[var(--secondary)] mb-3 flex items-start gap-3">
                <FaQuestionCircle className="text-[var(--accent)] shrink-0 mt-1" size={20} />
                {faq.question}
              </h3>
              <p className="text-slate-600 leading-relaxed pr-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
