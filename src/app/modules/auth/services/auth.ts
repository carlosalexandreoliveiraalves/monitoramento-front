import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = '0-4tnlsfrldrl6mg67fualvd123d';

  private router = inject(Router);

  public isLogged = signal<boolean>(false);


  getAccessToken(): string | null {
    const storedData = sessionStorage.getItem(this.STORAGE_KEY);

    if (!storedData) return null;

    try {
      const parsedData = JSON.parse(storedData);
      // Navega no JSON: root -> authnResult -> access_token
      return parsedData?.authnResult?.access_token || null;
    } catch (e) {
      console.error('Erro ao fazer parse do token Cognito', e);
      return null;
    }
  }


  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    this.isLogged.set(true);
    return !!token;
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.clear();
    this.isLogged.set(false);
    this.router.navigate(['/']);
  }
}
