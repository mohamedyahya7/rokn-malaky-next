import { siteData } from '@/lib/data';
import { FaUsers, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import MagicButton from '@/components/ui/MagicButton';

export default function Services() {
  const { services } = siteData;

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <article 
              key={service.id}
              className="group border-x-1 bg-[var(--card-bg)] rounded-[var(--radius)] p-4 shadow-[var(--shadow)] border-y-[6px] border-[var(--primary)] flex flex-col hover:scale-105 hover:translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* ID Badge */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-xl font-bold text-[var(--primary)] opacity-50 z-0">
                {service.id}
              </div>

              {/* Content */}
              <div className="relative z-10 flex-grow">
                <div className="min-h-[180px] flex flex-col items-start justify-between">

                <h3 className="text-xl font-bold text-[var(--secondary)] mt-4 mb-2">
                  {service.title}
                </h3>

                {service.target_audience && (
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                    <FaUsers size={14} />
                    {service.target_audience}
                  </div>
                )}
                <p className="text-slate-600 text-sm leading-relaxed m-y-auto  mb-4 min-h-[60px]">
                  {service.description}
                </p>
                </div>


                <h4 className="text-sm font-bold text-[var(--secondary)] mb-3 pb-2 border-b border-slate-100 inline-block">
                  المميزات:
                </h4>
                <ul className="space-y-2 mb-6 flex flex-col items-start justify-between min-h-[240px] flex-wrap">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                      {feature}
                    </li>
                  ))}
                  {/* {service.features.length > 9 && (
                    <li className="text-xs text-slate-400 pt-1">+ والمزيد</li>
                  )} */}
                </ul>
              </div>

              {/* Action */}
              <div className="mt-auto pt-4 flex justify-center">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
