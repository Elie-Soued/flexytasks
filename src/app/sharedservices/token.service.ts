import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  getToken(): string {
    return localStorage.getItem('accessToken')!;
  }

  clearTokenFromURL(): void {
    window.history.replaceState({}, document.title, '/resetpassword');
  }
}
