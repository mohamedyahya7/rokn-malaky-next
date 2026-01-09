'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderNew from '@/components/layout/HeaderNew';
import Footer from '@/components/layout/Footer';
import { TrackingSearch } from './_components/TrackingSearch';

export default function TrackingPage() {
  const router = useRouter();
  
  const [searchCode, setSearchCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim();
    if (code) {
      router.push(`/track/${code}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-cairo">
      <HeaderNew />
      
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header & Search */}
          <TrackingSearch 
            value={searchCode}
            onChange={setSearchCode}
            onSearch={handleSearch}
            loading={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
