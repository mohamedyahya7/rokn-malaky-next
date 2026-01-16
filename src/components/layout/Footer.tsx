import { IconType } from 'react-icons';
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTelegramPlane, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import { siteData } from '@/lib/data';

const IconMap: Record<string, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
  tiktok: FaTiktok,
  snapchat: FaSnapchatGhost,
};

export default function Footer() {
  const { contact } = siteData;

  return (
    <footer id="contact" className="py-10 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 w-full"> {/* ensuring full width container logic */}
        <div className="bg-[var(--secondary)] text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-xl">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 relative z-10">تواصل معنا الآن</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12 relative z-10">
            <a 
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-lg md:text-xl font-medium bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all group"
            >
              <FaEnvelope className="text-(--accent) group-hover:scale-110 transition-transform" />
              <span>{contact.email}</span>
            </a>
            <a 
              href={`tel:+20${contact.phone}`}
              className="flex items-center gap-3 text-lg md:text-xl font-medium bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all group"
            >
              <FaPhone className="text-(--accent) group-hover:scale-110 transition-transform" />
              <span dir="ltr">+20 {contact.phone}</span>
            </a>
          </div>

          <div className="flex justify-center gap-4 relative z-10">
            {contact.social_media.map((social, idx) => {
              const Icon = IconMap[social.platform] || FaFacebook; // Fallback
             
              return (
                <a 
                  key={idx}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-white hover:text-[var(--primary)] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} شركة الركن الملكي للتوظيف. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
