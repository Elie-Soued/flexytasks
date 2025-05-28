import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TokenEffects } from '../../store/token.effects';
import { tokenReducer } from '../../store/token.reducer';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore({ token: tokenReducer }),
        provideEffects([TokenEffects]),
      ],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
