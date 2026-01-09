'use client';

import { useState, useCallback } from 'react';
import { Job, JobsResponse } from '../app/jobs/_utils/types';

export const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://admin.elroknelmalky.com/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const result: JobsResponse = await response.json();
      
      if (result.success) {
        //sort jobs by date
        setJobs(result.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('حدث خطأ أثناء تحميل الوظائف. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, jobs, fetchJobs };
};
