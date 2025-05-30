import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { BASE_URL } from '../app.config';

export type loginResponse = {
  code: number;
  accessToken?: string | undefined;
  message?: string;
};

export type forgotPasswordResponse = {
  code: number;
  success?: string;
  message?: string;
};

export type updatePasswordResponse = {
  code: number;
  success?: string;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  register(
    username: string,
    password: string,
    email: string,
    fullname: string
  ) {
    return this.httpClient.post<void>(`${BASE_URL}/users/register`, {
      username,
      password,
      email,
      fullname,
    });
  }

  resetPassword(username: string, email: string) {
    return this.httpClient.post<forgotPasswordResponse>(
      `${BASE_URL}/users/forgotpassword`,
      { username, email }
    );
  }

  updatePassword(updatedpassword: string) {
    return this.httpClient.post<updatePasswordResponse>(
      `${BASE_URL}/users/updatepassword`,

      {
        updatedpassword,
      },
      {
        headers: {
          authorization: this.tokenService.getToken(),
        },
      }
    );
  }

  login(username: string, password: string) {
    return this.httpClient.post<loginResponse>(`${BASE_URL}/users/login`, {
      username,
      password,
    });
  }

  logout() {
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }
}
