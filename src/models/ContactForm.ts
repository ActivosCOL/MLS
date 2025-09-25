export interface ContactType {
  name: string;
}

export interface ContactForm {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  data_consent: boolean;
  created_at_form: string;
  real_state: string | null;
  type: ContactType;
}

export interface ContactFormResponse {
  data: ContactForm[];
} 