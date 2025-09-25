import { BlogResponse } from '../models/Blog';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

function getAuthHeader() {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {} as Record<string, string>;
}

export class BlogService {
    private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw error;
        }
    }

    static async getAllBlogs(): Promise<BlogResponse> {
        const url = `${BASE_URL}/items/blogs?fields=*,author.*,category.*`;
        return this.fetchWithErrorHandling<BlogResponse>(url);
    }

    static async getBlogBySlug(slug: string): Promise<BlogResponse> {
        const url = `${BASE_URL}/items/blogs?fields=*,author.*,category.*&filter[slug][_eq]=${slug}`;
        return this.fetchWithErrorHandling<BlogResponse>(url);
    }

    static async getCategories(): Promise<{ data: Array<{ id: number; name: string; slug: string; description: string | null }> }> {
        const url = `${BASE_URL}/items/categories`;
        return this.fetchWithErrorHandling<{ data: Array<{ id: number; name: string; slug: string; description: string | null }> }>(url);
    }

    static async getAuthors(): Promise<{ data: Array<{ id: number; name: string; email: string }> }> {
        const url = `${BASE_URL}/items/authors`;
        return this.fetchWithErrorHandling<{ data: Array<{ id: number; name: string; email: string }> }>(url);
    }

    static async createBlog(data: any): Promise<any> {
        const response = await fetch(`${BASE_URL}/items/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al crear el blog');
        return response.json();
    }

    static async updateBlog(id: number, data: any): Promise<any> {
        const response = await fetch(`${BASE_URL}/items/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al actualizar el blog');
        return response.json();
    }

    static async deleteBlog(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/items/blogs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader(),
        });
        if (!response.ok) throw new Error('Error al eliminar el blog');
    }

    static async updatePublished(id: number, published: boolean): Promise<any> {
        const response = await fetch(`${BASE_URL}/items/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify({ published }),
        });
        if (!response.ok) throw new Error('Error al actualizar el estado de publicación');
        return response.json();
    }
} 