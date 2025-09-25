import axios from 'axios';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class CategoryService {
  static async getAll() {
    return axios.get(`${BASE_URL}/items/categories`);
  }

  static async update(id: number, data: any) {
    return axios.patch(`${BASE_URL}/items/categories/${id}`, data, {
      headers: {
        ...getAuthHeader(),
      },
    });
  }

  static async delete(id: number) {
    return axios.delete(`${BASE_URL}/items/categories/${id}`, {
      headers: {
        ...getAuthHeader(),
      },
    });
  }

  static async create(data: any) {
    return axios.post(`${BASE_URL}/items/categories`, data, {
      headers: {
        ...getAuthHeader(),
      },
    });
  }
} 