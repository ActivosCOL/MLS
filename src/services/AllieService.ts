import { AlliesResponse, Allie, AllieStatus, AllieStatusResponse } from '@/models/Afiliado';
import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class AllieService {
  static async getAllies(): Promise<AlliesResponse> {
    const response = await axios.get(`${BASE_URL}/items/allie?fields=*,status.*`);
    return response.data;
  }

  static async getAllieStatuses(): Promise<AllieStatusResponse> {
    const response = await axios.get(`${BASE_URL}/items/status_allie?fields=*,status.*`);
    return response.data;
  }

  static async createAllie(allie: Partial<Allie>): Promise<Allie> {
    try {
      const allieData = {
        ...allie,
        status: typeof allie.status === 'object' ? allie.status.id : allie.status
      };
      const response = await axios.post(
        `${BASE_URL}/items/allie`,
        allieData,
        { headers: getAuthHeader() }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creating allie:', error);
      throw error;
    }
  }

  static async updateAllie(id: number, allie: Partial<Allie>): Promise<Allie> {
    try {
      const allieData = {
        ...allie,
        status: typeof allie.status === 'object' ? allie.status.id : allie.status
      };
      const response = await axios.patch(
        `${BASE_URL}/items/allie/${id}`,
        allieData,
        { headers: getAuthHeader() }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error updating allie:', error);
      throw error;
    }
  }

  static async deleteAllie(id: number): Promise<void> {
    try {
      await axios.delete(
        `${BASE_URL}/items/allie/${id}`,
        { headers: getAuthHeader() }
      );
    } catch (error) {
      console.error('Error deleting allie:', error);
      throw error;
    }
  }
} 