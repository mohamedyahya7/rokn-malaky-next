'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TrackingSearch } from '@/components/track/TrackingSearch';
import { TrackingResultView } from '@/components/track/TrackingResultView';
import { useTracking } from '@/components/track/useTracking';
// import { RequestData } from '@/lib/track/types';
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
      if (searchCode !== codeFromUrl) {
         setSearchCode(codeFromUrl);
      }
      fetchData(codeFromUrl).then((result) => {
        if (result) setIsModalOpen(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount/initial params check 
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
          
          {error && !isModalOpen && (
            <div className={`mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 p-4 rounded-2xl border mb-2 ${
              error.includes('خادم') || error.includes('error')
                ? 'bg-red-50 text-red-600 border-red-100' 
                : 'bg-amber-50 text-amber-700 border-amber-100'
            } animate-in fade-in slide-in-from-top-2`}>
              {error.includes('خادم') || error.includes('error') ? (
                 <AlertCircle className="w-6 h-6 shrink-0" />
              ) : (
                 <AlertCircle className="w-6 h-6 shrink-0" />
              )}
              <p className="font-bold text-center">{error}</p>
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
