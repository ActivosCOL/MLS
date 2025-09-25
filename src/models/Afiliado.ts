export interface AllieStatus {
  id: number;
  name: string;
}

export interface Allie {
  id: number;
  name: string;
  image: string;
  address: string;
  phone: string;
  email_1: string;
  email_2: string;
  website: string;
  status: AllieStatus;
}

export interface AlliesResponse {
  data: Allie[];
}

export interface AllieStatusResponse {
  data: AllieStatus[];
} 