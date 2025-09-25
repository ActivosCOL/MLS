import { ApplicationResponse } from '@/models/Application';
import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

export class ApplicationService {
  static async getAll(): Promise<ApplicationResponse> {
    const response = await axios.get(`${BASE_URL}/items/applications`);
    return response.data;
  }
} 