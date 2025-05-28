import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TokenEffects } from '../../store/token.effects';
import { tokenReducer } from '../../store/token.reducer';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        provideStore({ token: tokenReducer }),
        provideEffects([TokenEffects]),
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
