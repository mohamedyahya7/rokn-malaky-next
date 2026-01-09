'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref to store the timer ID logic
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Logic for Top of Page
      if (currentScrollY < 10) {
        setIsTransparent(true);
        setIsVisible(true); // Always show at top
        // Clear any hide timer if we went back to top
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        return;
      }

      // 2. Logic for Scrolled State
      setIsTransparent(false);
      setIsVisible(true); // Show immediately when scrolling starts

      // Clear existing timer
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Set timer to hide after user stops scrolling (e.g. 1.5 seconds)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTransparent ? 'bg-transparent py-6' : 'bg-white shadow-md py-2'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-2xl font-extrabold tracking-tight transition-colors ${
              isTransparent ? 'text-[var(--secondary)] md:text-white md:drop-shadow-md' : 'text-[var(--secondary)]'
            }`}
          >
            الركن الملكي
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['من نحن', 'خدماتنا', 'شركاء النجاح', 'الأسئلة الشائعة'].map((item, idx) => {
              const href = ['#about', '#services', '#clients', '#faq'][idx];
              return (
                <Link 
                  key={idx}
                  href={href} 
                  className={`font-semibold transition-colors ${
                    isTransparent
                      ? 'text-white/90 hover:text-white drop-shadow-sm'
                      : 'text-slate-700 hover:text-[var(--primary)]'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            
            <Link 
              href="#contact" 
              className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                isTransparent
                   ? 'bg-white text-[var(--primary)] hover:bg-blue-50'
                   : 'bg-[var(--primary)] text-white hover:bg-[var(--secondary)]'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Drawer Content */}
        <div 
          className={`absolute top-0 right-0 w-[80%] max-w-[300px] h-full bg-white shadow-2xl p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
        >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-extrabold text-[var(--secondary)]">الركن الملكي</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:text-red-500">
                <FaTimes size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {['من نحن', 'خدماتنا', 'شركاء النجاح', 'الأسئلة الشائعة'].map((item, idx) => {
                const href = ['#about', '#services', '#clients', '#faq'][idx];
                return (
                  <Link 
                    key={idx}
                    href={href} 
                    className="text-lg font-semibold text-slate-700 hover:text-[var(--primary)] border-b border-slate-100 pb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                );
              })}
              <Link 
                href="#contact" 
                className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-[var(--secondary)] mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تواصل معنا
              </Link>
            </nav>
        </div>
      </div>
    </>
  );
}
