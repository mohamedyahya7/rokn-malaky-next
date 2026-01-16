  'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function HeaderNew() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navLinks = useMemo(() => [
    { name: 'الرئيسية', href: '/', id: 'hero', type: 'page' },
    { name: 'خدماتنا', href: '/#services', id: 'services', type: 'section' },
    { name: 'آراء العملاء', href: '/#testimonials', id: 'testimonials', type: 'section' },
    { name: 'تتبع الطلب', href: '/#track', id: 'track', type: 'section' },
    { name: 'الوظائف', href: '/jobs', id: 'jobs', type: 'page' },
    { name: 'الأسئلة الشائعة', href: '/#faq', id: 'faq', type: 'section' },
    { name: 'شركاء النجاح', href: '/#clients', id: 'clients', type: 'section' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      if (!isHomePage) return;

      const scrollPos = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      if (window.scrollY < 100) {
        setActiveSection('hero');
      } else if (scrollPos >= totalHeight - 50) {
        setActiveSection('contact');
      }
    };

    const sections = ['hero', 'services', 'jobs', 'track', 'clients', 'testimonials', 'faq', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!isHomePage) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scrollPos = window.scrollY + window.innerHeight;
          const totalHeight = document.documentElement.scrollHeight;
          const isAtBottom = scrollPos >= totalHeight - 50;
          const isAtTop = window.scrollY < 100;

          if (!isAtBottom && !isAtTop) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Function to observe elements and return true if all are found
    const observeSections = () => {
      let allFound = true;
      if (!isHomePage) return true;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        } else {
          allFound = false;
        }
      });
      return allFound;
    };

    if (isHomePage) {
      if (!observeSections()) {
        // Retry for dynamic content (like JobsPromo)
        const interval = setInterval(() => {
          if (observeSections()) {
            clearInterval(interval);
          }
        }, 500);

        // Stop retrying after 10 seconds to avoid infinite loops
        setTimeout(() => clearInterval(interval), 10000);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isHomePage]);

  // Separate effect for hash scrolling
  useEffect(() => {
    if (isHomePage && typeof window !== 'undefined' && window.location.hash) {
      const handleInitialHash = () => {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          // Extra timeout to ensure the browser's default scroll has finished
          // and the DOM has fully rendered
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
            setActiveSection(hash);
          }, 500);
        }
      };
      
      handleInitialHash();
      window.addEventListener('hashchange', handleInitialHash);
      return () => window.removeEventListener('hashchange', handleInitialHash);
    }
  }, [isHomePage]);

  const isActiveLink = (link: typeof navLinks[0]) => {
    if (isHomePage && activeSection === link.id) return true;
    
    if (link.type === 'page') {
      if (link.href === '/') return isHomePage && activeSection === 'hero';
      return pathname?.startsWith(link.href);
    }
    return isHomePage && activeSection === link.id;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);
    
    if (link.type === 'section') {
      if (isHomePage) {
        e.preventDefault();
        const targetId = link.href.split('#')[1];
        const element = document.getElementById(targetId);
        
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          setActiveSection(targetId);
        }
      }
      // If not home page, let the Link component handle navigation to /#section
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 sm:top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? 'bg-white/10 backdrop-blur-xl border-white/10 shadow-2xl py-2 px-6' 
            : 'bg-white/10 backdrop-blur-md border-white/10 shadow-lg py-2 px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"  onClick={() => setIsMobileMenuOpen(true)}>
            <button 
              className="md:hidden p-2 text-slate-800 hover:bg-white/10 rounded-lg transition-colors"
             
            >
              <FaBars size={24} />
            </button>
            
            {/* Active Section Indicator for Mobile */}
            <div className="md:hidden flex flex-col">
              {/* <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter leading-none text-right">أنت في</span> */}
              <span className="text-sm font-black text-(--primary) leading-tight text-right">
                {!isHomePage 
                  ? (pathname?.startsWith('/jobs') ? 'الوظائف' : 'الرئيسية')
                  : (navLinks.find(l => l.id === activeSection)?.name || (activeSection === 'contact' ? 'تواصل معنا' : 'الرئيسية'))
                }
              </span>
            </div>
          </div>

          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-lg shadow-sm border border-white/20">
              <Image 
                src="/assets/logo.jpg"
                alt="الركن الملكي"
                fill
                sizes="(max-width: 768px) 48px, 56px"
                className="object-cover"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const active = isActiveLink(link);
              return (
                <Link 
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 font-bold transition-all relative group ${
                    active ? 'text-(--primary)' : 'text-slate-700 hover:text-(--primary)'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-(--primary) transition-all ${
                    active ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                  }`}></span>
                </Link>
              );
            })}
            
            <Link 
              href="/#contact" 
              onClick={(e) => handleNavClick(e, { name: 'تواصل معنا', href: '/#contact', id: 'contact', type: 'section' })}
              className={`mr-4 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 ${
                isActiveLink({ name: 'تواصل معنا', href: '/#contact', id: 'contact', type: 'section' })
                  ? 'bg-(--secondary) text-white shadow-blue-500/40 ring-2 ring-(--primary) ring-offset-2 scale-105'
                  : 'bg-gradient-to-r from-(--primary) to-(--secondary) text-white shadow-blue-500/20 hover:shadow-blue-500/40'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>

        
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-white shadow-2xl p-8 transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black bg-gradient-to-r from-(--secondary) to-(--primary) bg-clip-text text-transparent">
              الركن الملكي
            </span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => {
              const active = isActiveLink(link);
              return (
                <Link 
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative text-lg font-bold transition-all px-4 py-3 rounded-xl flex items-center justify-between group ${
                    active 
                      ? 'bg-(--primary)/10 text-(--primary)' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="w-1.5 h-6 bg-(--primary) rounded-full animate-pulse"></span>
                  )}
                </Link>
              );
            })}
            <Link 
              href="/#contact"
              onClick={(e) => handleNavClick(e, { name: 'تواصل معنا', href: '/#contact', id: 'contact', type: 'section' })}
              className={`mt-6 px-8 py-4 rounded-xl font-bold text-center shadow-lg transition-all ${
                activeSection === 'contact'
                  ? 'bg-(--secondary) text-white shadow-blue-500/40 scale-[1.02]'
                  : 'bg-gradient-to-r from-(--primary) to-(--secondary) text-white shadow-blue-500/20 hover:scale-[1.02]'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
