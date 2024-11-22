import { Alert } from "react-native";

interface LoginResponse {
    token: string;
    ok:boolean;
  }
  
interface LoginRequest {
    email: string;
    password: string;
  }
  
  export default async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('http://localhost:3000/user/signin', {
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