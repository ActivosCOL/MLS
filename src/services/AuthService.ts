import { LoginRequest, LoginResponse } from '@/models/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://directusactivosporcolombia.makerstech.co';

// Variable para mantener el ID del interceptor
let requestInterceptorId: number | null = null;

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { access_token, expires } = response.data.data;
      
      // Guardar el token en cookies y localStorage para compatibilidad
      Cookies.set('access_token', access_token, { expires: expires / (24 * 60 * 60) }); // Convertir segundos a días
      Cookies.set('user_email', credentials.email);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_email', credentials.email);
      
      // Configurar el tiempo de expiración
      const expirationTime = Date.now() + expires;
      Cookies.set('token_expiration', expirationTime.toString());
      localStorage.setItem('token_expiration', expirationTime.toString());
      
      // Configurar el interceptor de axios para incluir el token en las peticiones
      if (requestInterceptorId !== null) {
        axios.interceptors.request.eject(requestInterceptorId);
      }
      requestInterceptorId = axios.interceptors.request.use((config) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  static logout(): void {
    // Limpiar todas las cookies
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(cookieName => {
      Cookies.remove(cookieName);
    });

    // Limpiar localStorage
    localStorage.clear();

    // Limpiar sessionStorage
    sessionStorage.clear();

    // Limpiar los interceptores de axios
    if (requestInterceptorId !== null) {
      axios.interceptors.request.eject(requestInterceptorId);
      requestInterceptorId = null;
    }
  }

  static isAuthenticated(): boolean {
    const token = Cookies.get('access_token');
    const expiration = Cookies.get('token_expiration');
    
    if (!token || !expiration) return false;
    
    // Verificar si el token ha expirado
    if (Date.now() > parseInt(expiration)) {
      this.logout();
      return false;
    }
    
    return true;
  }

  static getToken(): string | undefined {
    return Cookies.get('access_token');
  }
} 