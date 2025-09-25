export interface Application {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  job_title: string;
  resume_url: string;
  create_at_form: string;
}

export interface ApplicationResponse {
  data: Application[];
} 