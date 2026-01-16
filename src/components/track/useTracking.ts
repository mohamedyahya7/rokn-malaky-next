import { useState, useCallback } from 'react';
import { API_BASE_URL } from '@/lib/track/constants';
import { RequestData } from '@/lib/track/types';

export const useTracking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RequestData | null>(null);

  const fetchData = useCallback(async (code: string) => {
    if (!code) return null;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?code=${code.trim()}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setData(result.data);
        return result.data;
      } else {
        setError('عذراً، لم يتم العثور على طلب بهذا الكود');
        setData(null);
        return null;
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, fetchData };
};
