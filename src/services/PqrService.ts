import { PqrResponse } from '@/models/Pqr';
import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

export class PqrService {
  static async getAllPqrs(): Promise<PqrResponse> {
    const response = await axios.get(`${BASE_URL}/items/pqr`);
    return response.data;
  }
} 