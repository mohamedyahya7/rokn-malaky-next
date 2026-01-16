import React from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { STATUS_CATEGORIES } from '@/lib/track/constants';

interface StatusIconProps {
  status: string;
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, className }) => {
  const s = status?.trim() || '';
  if (!s) return null;
  
  // No icons for success or error states as requested
  if (STATUS_CATEGORIES.SUCCESS.some(ss => s.includes(ss))) return <CheckCircle2 className={`${className} text-green-500`} />;
  if (STATUS_CATEGORIES.ERROR.some(es => s.includes(es))) return null;

  if (STATUS_CATEGORIES.WAITING_KEYWORDS.some(wk => s.includes(wk))) {
    return <Clock className={`${className} text-amber-500 animate-pulse`} />;
  }
  
  return <AlertCircle className={`${className} text-slate-300`} />;
};
