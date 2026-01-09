'use client';

import React from 'react';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { Job } from '../_utils/types';

interface JobCardProps {
  job: Job;
  onShowMore: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onShowMore }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1 group flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-(--primary) group-hover:scale-110 transition-all duration-300">
          <Briefcase className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          {new Date(job.created_at).toLocaleDateString('ar-EG')}
        </span>
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-3 line-clamp-2 min-h-[3.5rem]">
        {job.name}
      </h3>
      
      <p className="text-slate-500 mb-8 line-clamp-3 text-sm font-medium leading-relaxed flex-grow">
        {job.description.replace(/[\*#_\-]/g, '')}
      </p>

      <button 
        onClick={() => onShowMore(job)}
        className="w-full py-4 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-(--primary) hover:text-white hover:border-(--primary) transition-all flex items-center justify-center gap-2 group/btn"
      >
        تفاصيل الوظيفة
        <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
