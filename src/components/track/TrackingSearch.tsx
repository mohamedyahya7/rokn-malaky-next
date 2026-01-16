import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface TrackingSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export const TrackingSearch: React.FC<TrackingSearchProps> = ({ value, onChange, onSearch, loading }) => {
  return (
    <div className="mb-10 text-center md:text-right flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-(--primary) text-right">
          تتبع حالة الطلب
        </h1>
        <p className="text-slate-600 text-lg text-right">
          أدخل كود الطلب الخاص بك لمتابعة المستجدات
        </p>
      </div>
      
      <form onSubmit={onSearch} className="relative w-full md:max-w-md group">
        <input 
          type="text" 
          placeholder="أدخل كود الطلب..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border-2 border-slate-200 rounded-3xl py-4 px-6 pr-14 focus:border-(--primary) focus:outline-none shadow-sm transition-all text-right font-bold"
        />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-(--primary) transition-colors" />
        <button 
          type="submit"
          disabled={loading}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-(--primary) text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-(--secondary) transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          بحث
        </button>
      </form>
    </div>
  );
};
