'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function HeaderNew() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detection for bottom of page
      const scrollPos = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollPos >= totalHeight - 100) {
        setActiveSection('contact');
      }
    };

    const sections = ['about', 'services', 'clients', 'faq', 'contact'];
    
    // Intersection Observer to track sections
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px', // Smaller margins for more precise tracking
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Additional check: only set active if we're not at the very bottom (where contact takes priority)
          const scrollPos = window.scrollY + window.innerHeight;
          const totalHeight = document.documentElement.scrollHeight;
          if (scrollPos < totalHeight - 100) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'من نحن', href: '#about', id: 'about' },
    { name: 'خدماتنا', href: '#services', id: 'services' },
    { name: 'شركاء النجاح', href: '#clients', id: 'clients' },
    { name: 'الأسئلة الشائعة', href: '#faq', id: 'faq' },
  ];

  const isActiveLink = (id: string) => activeSection === id;

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-white/20 shadow-2xl py-3 px-6' 
            : 'bg-white/10 backdrop-blur-md border-white/10 shadow-lg py-5 px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-black bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            الركن الملكي
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const active = isActiveLink(link.id);
              return (
                <Link 
                  key={idx}
                  href={link.href} 
                  className={`px-4 py-2 font-bold transition-all relative group ${
                    active ? 'text-[var(--primary)]' : 'text-slate-700 hover:text-[var(--primary)]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--primary)] transition-all ${
                    active ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                  }`}></span>
                </Link>
              );
            })}
            
            <Link 
              href="#contact" 
              className={`mr-4 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 ${
                isActiveLink('contact')
                  ? 'bg-[var(--secondary)] text-white shadow-blue-500/40 ring-2 ring-[var(--primary)] ring-offset-2 scale-105'
                  : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-blue-500/20 hover:shadow-blue-500/40'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-800 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Drawer Content */}
        <div 
          className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-white shadow-2xl p-8 transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] bg-clip-text text-transparent">
              الركن الملكي
            </span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link, idx) => {
              const active = isActiveLink(link.id);
              return (
                <Link 
                  key={idx}
                  href={link.href} 
                  className={`text-lg font-bold transition-all border-b border-slate-50 pb-4 ${
                    active ? 'text-[var(--primary)] translate-x-2' : 'text-slate-700 hover:text-[var(--primary)] hover:translate-x-2'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="#contact" 
              className={`mt-6 px-8 py-4 rounded-xl font-bold text-center shadow-lg transition-all ${
                isActiveLink('contact')
                  ? 'bg-[var(--secondary)] text-white shadow-blue-500/40 scale-[1.02]'
                  : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-blue-500/20 hover:scale-[1.02]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تواصل معنا
            </Link>
          </nav>

          <div className="absolute bottom-12 left-0 right-0 text-center text-slate-400 text-sm">
            نحن هنا لخدمتكم دائماً
          </div>
        </div>
      </div>
    </>
  );
}
