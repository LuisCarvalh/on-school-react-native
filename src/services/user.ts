import { API_URL } from '@env';

interface LoginResponse {
    token: string;
    ok:boolean;
  }
  
interface LoginRequest {
    email: string;
    password: string;
  }
  
  export default async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data: LoginResponse = await response.json();
    data.ok = response.ok;
    return data;
  }

  export async function fetchUser(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data: User = await response.json();
      return data;
  }