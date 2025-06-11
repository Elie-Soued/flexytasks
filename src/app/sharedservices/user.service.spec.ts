import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { BASE_URL } from '../app.config';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpTestingController;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    tokenService = jasmine.createSpyObj('TokenService', [
      'setToken',
      'getToken',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TokenService, useValue: tokenService },
      ],
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('login function is correctly executed', () => {
    service.login('Pilex', '123').subscribe();
    const req = httpClient.expectOne(`${BASE_URL}/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'Pilex',
      password: '123',
    });

    req.flush({
      code: 200,
      accessToken: 'my token',
      message: 'Login successfull',
    });
  });

  it('register function is correctly executed', () => {
    service.register('pilex', '123', 'pilex@gmail.com', 'pilex').subscribe();

    const req = httpClient.expectOne(`${BASE_URL}/users/register`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'pilex',
      password: '123',
      email: 'pilex@gmail.com',
      fullname: 'pilex',
    });

    req.flush(null);
  });

  it('updatepassword function is correctly executed', () => {
    service.updatePassword('pilex').subscribe();
    let tokenServiceMock = 'myToken';
    tokenService.getToken.and.returnValue(tokenServiceMock);

    const req = httpClient.expectOne(`${BASE_URL}/users/updatepassword`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      updatedpassword: 'pilex',
    });

    req.flush({
      code: 200,
      success: 'password updated successfully',
    });
  });

  it('resetpassword function is correctly executed', () => {
    service.resetPassword('Pilex', 'pilex@gmail.com').subscribe();

    const req = httpClient.expectOne(`${BASE_URL}/users/forgotpassword`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'Pilex',
      email: 'pilex@gmail.com',
    });

    req.flush({
      code: 200,
      success:
        'Please check your inbox (and maybe also your spam). We sent you a link to reset your password :)',
    });
  });
});
