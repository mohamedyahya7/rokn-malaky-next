import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarInfoItemProps {
  label: string;
  value: string;
  Icon: LucideIcon;
}

export const SidebarInfoItem: React.FC<SidebarInfoItemProps> = ({ label, value, Icon }) => (
  <div className="flex items-center gap-4 text-slate-700 justify-end text-right w-full">
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate">{label}</p>
      <p className="font-bold text-sm leading-tight text-slate-800 wrap-break-word">{value || 'غير محدد'}</p>
    </div>
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
      <Icon className="w-5 h-5 text-(--primary)" />
    </div>
  </div>
);
