import { Injectable } from '@angular/core';
import { signIn, signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  async login(username: string, password: string) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log('Login realizado:', isSignedIn);
      return isSignedIn;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async getCurrentToken() {
    try {
      const { tokens } = await fetchAuthSession();
      
      // Retorna o ID Token (geralmente usado para autenticação)
      return tokens?.idToken?.toString();
      
      // Se precisar do Access Token, use: tokens?.accessToken?.toString();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  
  async logout() {
    try {
      await signOut();
    } catch (error) {
      console.error('Erro ao sair', error);
    }
  }
}
