import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { BASE_URL } from '../app.config';

describe('UserService', () => {
  let service: UserService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    tokenService = jasmine.createSpyObj('TokenService', [
      'setToken',
      'getToken',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: TokenService, useValue: tokenService },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('login function is correctly executed', () => {
    service.login('Pilex', '123');
    expect(httpClient.post).toHaveBeenCalledWith(`${BASE_URL}/users/login`, {
      username: 'Pilex',
      password: '123',
    });
  });

  it('register function is correctly executed', () => {
    service.register('pilex', '123', 'pilex@gmail.com', 'pilex');
    expect(httpClient.post).toHaveBeenCalledWith(`${BASE_URL}/users/register`, {
      username: 'pilex',
      password: '123',
      email: 'pilex@gmail.com',
      fullname: 'pilex',
    });
  });

  it('updatepassword function is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    tokenService.getToken.and.returnValue(tokenServiceMock);
    service.updatePassword('pilex');
    expect(httpClient.post).toHaveBeenCalledWith(
      `${BASE_URL}/users/updatepassword`,
      {
        updatedpassword: 'pilex',
      },
      {
        headers: {
          authorization: tokenServiceMock,
        },
      }
    );
  });

  it('resetpassword function is correctly executed', () => {
    service.resetPassword('Pilex', 'pilex@gmail.com');
    expect(httpClient.post).toHaveBeenCalledWith(
      `${BASE_URL}/users/forgotpassword`,
      {
        username: 'Pilex',
        email: 'pilex@gmail.com',
      }
    );
  });
});
