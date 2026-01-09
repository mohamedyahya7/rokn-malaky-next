'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import HeaderNew from '@/components/layout/HeaderNew';
import Footer from '@/components/layout/Footer';
import { Loader2, AlertCircle } from 'lucide-react';
import { TrackingSearch } from '../_components/TrackingSearch';
import { TrackingResultView } from '../_components/TrackingResultView';
import { useTracking } from '../_components/useTracking';

export default function TrackingPage({ params: paramsPromise }: { params: Promise<{ id?: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const id = params?.id;
  
  const { loading, error, data, fetchData } = useTracking();
  const [searchCode, setSearchCode] = useState(id || '');
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setSearchCode(id || '');
  }

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

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

          {/* Page Content States */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 animate-pulse">
               <Loader2 className="w-16 h-16 text-(--primary) animate-spin mb-6" />
               <p className="text-xl font-bold text-slate-400">جاري استرجاع البيانات المحدثة...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-[3rem] p-16 shadow-xl border border-slate-100 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{error}</h2>
              <p className="text-slate-500 mb-10 font-medium">تأكد من كتابة الكود بشكل صحيح أو تواصل مع فريق الدعم لدينا</p>
              <button 
                onClick={() => fetchData(searchCode)}
                className="px-10 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all transform active:scale-95"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : data ? (
            <TrackingResultView data={data} />
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
