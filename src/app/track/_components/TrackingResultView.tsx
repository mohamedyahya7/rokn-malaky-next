import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Briefcase, Phone, Globe, FileText, Clock, ShieldCheck } from 'lucide-react';
import { RequestData } from '../_utils/types';
import { STATUS_CATEGORIES } from '../_utils/constants';
import { SidebarInfoItem } from './SidebarInfoItem';
import { StatusBadge } from './StatusBadge';

interface TrackingResultViewProps {
  data: RequestData;
}

export const TrackingResultView: React.FC<TrackingResultViewProps> = ({ data }) => {
  const currentStatusColor = useMemo(() => {
    const s = data.status || '';
    if (STATUS_CATEGORIES.SUCCESS.includes(s)) return 'text-green-600 bg-green-50 border-green-200';
    if (STATUS_CATEGORIES.ERROR.includes(s)) return 'text-red-500 bg-red-50 border-red-200';
    return 'text-amber-500 bg-amber-50 border-amber-200';
  }, [data.status]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Sidebar: Personal Info */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-(--primary)"></div>
          
          <div className="flex lg:flex-col items-center justify-around mb-10">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 shadow-inner">
              <User className="w-10 h-10 text-(--primary)" />
            </div>
            <div className="flex flex-col gap-2">

            <h2 className="text-2xl font-black text-slate-800 text-center mb-3">{data.name}</h2>
            <span className={`px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border-2 ${currentStatusColor}`}>
              {data.status}
            </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
            <SidebarInfoItem label="الوظيفة" value={data.job} Icon={Briefcase} />
            <SidebarInfoItem label="رقم الهاتف" value={data.phone} Icon={Phone} />
            <SidebarInfoItem label="الجنسية" value={data.country} Icon={Globe} />
            <SidebarInfoItem label="رقم الجواز" value={data.passport} Icon={FileText} />
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 text-right">
            <div className="flex items-center justify-around text-[11px] text-slate-400 font-bold">
               <time className="tracking-tighter" dir="ltr">{new Date(data.updated_at).toLocaleString('ar-EG')}</time>
               <span className="flex items-center gap-1.5 uppercase">آخر تحديث لالطلب <Clock className="w-3.5 h-3.5" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Administrative Statuses */}
      <div className="lg:col-span-2 space-y-4 text-right">
        <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-xl border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
              تحديث تلقائي مستمر
            </div>
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-4">
              حالات الطلب الإدارية
              <ShieldCheck className="w-8 h-8 text-(--primary)" />
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatusBadge label="حالة التفويض" status={data.mandate_status} />
            <StatusBadge label="حالة الكشف الطبي" status={data.medical_status} attachmentUrl={data.medical_attachment} />
            <StatusBadge label="حالة العقد" status={data.contract_status} />
            <StatusBadge label="حالة الجواز" status={data.passport_status} attachmentUrl={data.passport_attachment} />
            
            {data.qualification_confirmed === 1 && (
              <StatusBadge label="تأكيد المؤهل" status="تم توثيق" attachmentUrl={data.qualification_attachment} />
            )}
            {data.qualification_consulate === 1 && (
              <StatusBadge label="قنصلية المؤهل" status="تم توثيق" attachmentUrl={data.consulate_attachment} />
            )}
          </div>

          {/* Markdown Notes */}
          {data.notes && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-l font-black text-slate-800 mb-4 flex items-center justify-center md:justify-end gap-3">
                ملاحظات وتوجيهات الفريق
                <FileText className="w-6 h-6 text-(--primary)" />
              </h4>
              <div className="bg-slate-50/50 p-8 rounded-4xl border border-slate-100 text-slate-700 leading-relaxed font-bold shadow-inner overflow-hidden">
                <div className="prose prose-blue max-w-none text-right markdown-content">
                  <ReactMarkdown>{data.notes}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
