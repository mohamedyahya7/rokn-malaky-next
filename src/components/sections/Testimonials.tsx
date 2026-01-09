'use client';

import React from 'react';
import { siteData } from '@/lib/data';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';

interface Testimonial {
  name: string;
  content: string;
  role: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg transition-all border border-gray-100 h-full">
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary) text-white font-bold text-lg">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-900">
          {testimonial.name}
        </h4>
        <span className="text-sm text-(--primary)/80">
          {testimonial.role || "عميل"}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-current text-(--primary)"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <div className="relative flex-1">
      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-(--primary)/10" />
      <p className="relative text-base leading-relaxed text-gray-600">
        {testimonial.content}
      </p>
    </div>
    
  </div>
);

const Testimonials = () => {
  const { testimonials } = siteData;

  // Carousel Logic
  const {
    activeIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    stopAutoplay,
  } = useCarousel(testimonials?.length || 0, { 
    loop: true, 
    autoplay: true, 
    autoplayInterval: 5000 
  });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
            ماذا يقول <span className="text-(--primary)">عملؤنا؟</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            أكثر من 20 عاماً من الثقة والمصداقية في خدمتكم. هذه بعض شهادات الأشخاص الذين تشرفنا بالتعامل معهم.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Main Slide Area */}
          <div className="overflow-hidden px-4 md:px-0">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }} 
            >
               {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full shrink-0 px-2" dir="rtl">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
               ))}
            </div>
          </div>

           {/* Navigation Buttons - Absolute positioned */}
           <button
            onClick={() => {
              stopAutoplay();
              goToNext();
            }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 hidden md:block"
            aria-label="Next"
          >
            <ChevronLeft className="h-6 w-6 text-(--primary)" />
          </button>

          <button
            onClick={() => {
              stopAutoplay();
              goToPrevious();
            }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 hidden md:block"
            aria-label="Previous"
          >
            <ChevronRight className="h-6 w-6 text-(--primary)" />
          </button>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stopAutoplay();
                  goToSlide(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-(--primary)'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-(--primary) blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-(--secondary) blur-3xl opacity-20"></div>
      </div>
    </section>
  );
};

export default Testimonials;
