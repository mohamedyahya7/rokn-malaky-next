export interface Attachment {
  id: number;
  request_id: number;
  file: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface RequestData {
  id: number;
  code: string;
  name: string;
  job: string;
  phone: string;
  country: string;
  passport: string;
  mandate_status: string;
  medical_status: string;
  contract_status: string;
  qualification_confirmed: number;
  qualification_consulate: number;
  passport_status: string;
  notes: string | null;
  status: string;
  status_updated_at: string;
  created_at: string;
  updated_at: string;
  attachemants?: Attachment[];
  medical_attachment: string | null;
  qualification_attachment: string | null;
  consulate_attachment: string | null;
  passport_attachment: string | null;
}
