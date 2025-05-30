import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(TokenService);
  });

  it('make sure setToken is executed correctly', () => {
    service.setToken('pilex');
    expect(localStorage.getItem('accessToken')).toEqual('pilex');
  });

  it('make sure getToken is executed correctly', () => {
    service.setToken('pilex');
    expect(service.getToken()).toEqual('pilex');
  });
});
