'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { JobCard } from '@/app/jobs/_components/JobCard';
import { JobDetailsModal } from '@/app/jobs/_components/JobDetailsModal';
import { Modal } from '@/components/ui/Modal';
import { Job } from '@/app/jobs/_utils/types';

export default function JobsPromo() {
  const { loading, jobs, fetchJobs } = useJobs();
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Use only first 3 jobs
  const displayJobs = jobs.slice(0, 3);

  if (!loading && displayJobs.length === 0) return null;

  return (
    <section id="jobs" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 text-(--primary) rounded-full text-xs font-black tracking-widest uppercase mb-2">
                <Briefcase className="w-4 h-4" />
                <span>فرص وظيفية مميزة</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-(--primary) leading-tight">
                أحدث الوظائف المتاحة
              </h2>
              <p className="text-xl text-slate-500 max-w-xl font-medium">
                اكتشف فرص العمل الحصرية في كبرى الشركات السعودية والخليجية
              </p>
          </div>

          <Link 
            href="/jobs" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-bold hover:bg-(--primary) hover:text-white hover:border-(--primary) transition-all shadow-sm hover:shadow-xl"
          >
            <span>عـرض كافـة الوظائف</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 h-96 animate-pulse" />
              ))}
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayJobs.map(job => (
                <JobCard key={job.id} job={job} onShowMore={setSelectedJob} />
              ))}
           </div>
        )}

      </div>

      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)}
        title={selectedJob?.name || 'تفاصيل الوظيفة'}
      >
        <JobDetailsModal job={selectedJob} />
      </Modal>
    </section>
  );
}
