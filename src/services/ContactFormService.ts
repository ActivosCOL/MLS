import { ContactFormResponse } from '@/models/ContactForm';
import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

export class ContactFormService {
  static async getAll(): Promise<ContactFormResponse> {
    const response = await axios.get(`${BASE_URL}/items/contact_form?fields=*,type.name`);
    return response.data;
  }
} 