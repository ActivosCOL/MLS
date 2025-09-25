import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

export class NewsletterService {
  static async getAll() {
    return axios.get(`${BASE_URL}/items/newsletter`);
  }

  static async updateStatus(id: number, status: boolean) {
    const token = localStorage.getItem('access_token');
    return axios.patch(
      `${BASE_URL}/items/newsletter/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
