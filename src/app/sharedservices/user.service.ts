import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

type registerPayload = {
  username: string;
  password: string;
  fullname: string;
  email: string;
};

type forgotPasswordPayload = {
  username: string;
  email: string;
};

type updatePasswordPayload = {
  updatedpassword: string;
};

type loginPayload = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = environment.BASE_URL;

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
    return this.httpClient.post<registerPayload>(
      `${this.BASE_URL}/users/register`,
      { username, password, email, fullname }
    );
  }

  resetPassword(username: string, email: string) {
    return this.httpClient.post<forgotPasswordPayload>(
      `${this.BASE_URL}/users/forgotpassword`,
      { username, email }
    );
  }

  updatePassword(updatedpassword: string) {
    return this.httpClient.post<updatePasswordPayload>(
      `${this.BASE_URL}/users/updatepassword`,

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
    return this.httpClient.post<loginPayload>(`${this.BASE_URL}/users/login`, {
      username,
      password,
    });
  }

  logout() {
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }
}
