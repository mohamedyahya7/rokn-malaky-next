'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Job } from '../_utils/types';
import { Calendar, Briefcase, Info } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface JobDetailsModalProps {
  job: Job | null;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job }) => {
  if (!job) return null;

  return (
    <div className="space-y-8 text-right font-cairo">
      {/* Header Info */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="space-y-2">
                 <h2 className="text-2xl md:text-3xl font-black text-slate-800">{job.name}</h2>
                 <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-bold">
                     <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-(--primary)" />
                        نشر بتاريخ: {new Date(job.created_at).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-(--primary)" />
                        المسمى الوظيفي: {job.name}
                    </span>
                 </div>
            </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                 <Info className="w-5 h-5 text-(--primary)" />
             </div>
             <h3 className="text-xl font-bold text-slate-800">تفاصيل ومتطلبات الوظيفة</h3>
        </div>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm leading-8 text-slate-600 font-medium">
             <div className="prose prose-lg max-w-none text-right prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 markdown-content">
                <ReactMarkdown>{job.description}</ReactMarkdown>
             </div>
        </div>
      </div>

      {/* Action */}
      <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
        <p className="text-slate-500 font-bold">مهتم بهذه الوظيفة؟ تواصل معنا مباشرة</p>
        <a 
          href={`https://wa.me/20${job.phone.startsWith('0') ? job.phone.substring(1) : job.phone}?text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص وظيفة: ${job.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto min-w-[300px] py-4 px-8 bg-[#25D366] text-white rounded-2xl font-black hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-green-200 transform hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <FaWhatsapp className="w-6 h-6" />
          تواصل عبر واتساب
        </a>
      </div>
    </div>
  );
};
