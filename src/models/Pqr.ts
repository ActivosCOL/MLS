export interface Pqr {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string | null;
  phone: string;
  comments: string;
  data_consent: boolean;
  created_at_form: string;
}

export interface PqrResponse {
  data: Pqr[];
} 