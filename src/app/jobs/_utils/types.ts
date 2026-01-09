export interface Job {
  id: number;
  name: string;
  description: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
}
