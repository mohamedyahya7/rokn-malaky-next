import React from 'react';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { StatusIcon } from './StatusIcon';
import { STATUS_CATEGORIES } from '../_utils/constants';

interface StatusBadgeProps {
  label: string;
  status: string;
  attachmentUrl?: string | null;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, status, attachmentUrl }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-(--primary)/30 overflow-hidden">
      <div className="flex flex-col text-right">
        <span className="text-xs text-slate-400 font-bold mb-1 opacity-80">{label}</span>
        <span className="font-bold text-slate-800 text-lg leading-none">{status || 'غير محدد'}</span>
      </div>
      
      {attachmentUrl ? (
        <a 
          href={attachmentUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 group relative shrink-0 shadow-sm"
        >
          <img 
            src={attachmentUrl} 
            alt={label} 
            width={64}
            height={64}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
        </a>
      ) : (
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          {(() => {
            const s = status?.trim() || '';
            const isWaiting = STATUS_CATEGORIES.WAITING_KEYWORDS.some(wk => s.includes(wk));

            if (isWaiting) {
              return (
                <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                  <StatusIcon status={status} className="w-6 h-6" />
                </div>
              );
            }
            
            // Success, Error or Empty - No icon holder background
            return null;
          })()}
        </div>
      )}
    </div>
  );
};
