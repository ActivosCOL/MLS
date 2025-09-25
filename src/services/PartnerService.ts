import { Partner, PartnersResponse } from '@/models/Partner';
import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class PartnerService {
    static async getAllPartners(): Promise<PartnersResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/items/partners`);
            return response.data;
        } catch (error) {
            console.error('Error fetching partners:', error);
            throw error;
        }
    }

    static async getPartnerById(id: number): Promise<Partner> {
        try {
            const response = await axios.get(`${BASE_URL}/items/partners/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching partner with id ${id}:`, error);
            throw error;
        }
    }

    static async createPartner(data: Partial<Partner>): Promise<Partner> {
        const response = await axios.post(
            `${BASE_URL}/items/partners`,
            data,
            { headers: getAuthHeader() }
        );
        return response.data.data;
    }

    static async updatePartner(id: number, data: Partial<Partner>): Promise<Partner> {
        const response = await axios.patch(
            `${BASE_URL}/items/partners/${id}`,
            data,
            { headers: getAuthHeader() }
        );
        return response.data.data;
    }

    static async deletePartner(id: number): Promise<void> {
        await axios.delete(
            `${BASE_URL}/items/partners/${id}`,
            { headers: getAuthHeader() }
        );
    }
} 