'use client';

import React, { useEffect, useState } from 'react';
import HeaderNew from '@/components/layout/HeaderNew';
import Footer from '@/components/layout/Footer';
import { useJobs } from '@/hooks/useJobs';
import { JobCard } from './_components/JobCard';
import { JobDetailsModal } from './_components/JobDetailsModal';
import { Modal } from '@/components/ui/Modal';
import { Job } from './_utils/types';
import { Loader2, Briefcase } from 'lucide-react';

export default function JobsPage() {
  const { loading, error, jobs, fetchJobs } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-slate-50 font-cairo">
      <HeaderNew />
      
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-(--primary) font-el-messiri">
              فرص العمل المتاحة
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              استعرض أحدث الوظائف المتاحة في المملكة العربية السعودية ودول الخليج وانطلق نحو مستقبل مهني أفضل
            </p>
          </div>

          {/* Jobs Grid */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                <Loader2 className="w-16 h-16 text-(--primary) animate-spin mb-6" />
                <p className="text-xl font-bold text-slate-400">جاري تحميل الوظائف...</p>
             </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-red-100">
               <p className="text-xl font-bold text-red-500 mb-6">{error}</p>
               <button 
                 onClick={fetchJobs} 
                 className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
               >
                 إعادة المحاولة
               </button>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onShowMore={setSelectedJob} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-slate-300" />
               </div>
               <p className="text-xl font-bold text-slate-400">لا توجد وظائف متاحة حالياً</p>
               <p className="text-slate-400 mt-2">يرجى التحقق مرة أخرى لاحقاً</p>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Job Details Modal */}
      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)}
        title={selectedJob?.name || 'تفاصيل الوظيفة'}
      >
        <JobDetailsModal job={selectedJob} />
      </Modal>
    </div>
  );
}
