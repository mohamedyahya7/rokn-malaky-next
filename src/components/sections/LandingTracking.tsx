'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TrackingSearch } from '@/app/track/_components/TrackingSearch';
import { TrackingResultView } from '@/app/track/_components/TrackingResultView';
import { useTracking } from '@/app/track/_components/useTracking';
import { RequestData } from '@/app/track/_utils/types';
import { Modal } from '@/components/ui/Modal';
import { AlertCircle } from 'lucide-react';

export default function LandingTracking() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const { loading, error, data, fetchData } = useTracking();
  const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize from URL
  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl && !loading) {
      if (codeFromUrl !== (data as RequestData | null)?.code) {
         fetchData(codeFromUrl).then((result) => {
          if (result) setIsModalOpen(true);
         });
      }
    }
  }, [searchParams, fetchData, data, loading]); 
  // Intentional dependency simplified. Careful with fetchData dependency loop.
  // useTracking's fetchData is useCallback'd, so it's stable.

  const updateUrl = (code: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (code) {
      params.set('code', code);
    } else {
      params.delete('code');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      updateUrl(searchCode.trim());
      const result = await fetchData(searchCode);
      if (result) {
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    updateUrl(null);
  };

  return (
    <section id="track" className="py-20 px-4 relative overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Search Widget */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100/50">
          <TrackingSearch 
            value={searchCode}
            onChange={setSearchCode}
            onSearch={handleSearch}
            loading={loading}
          />
          
          {/* Inline Error Message */}
          {error && !isModalOpen && (
            <div className="mt-6 flex items-center justify-center gap-3 text-red-500 bg-red-50 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" />
              <p className="font-bold">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={`نتائج البحث للطلب: ${data?.code || searchCode}`}
      >
        {data && <TrackingResultView data={data} />}
      </Modal>
    </section>
  );
}
