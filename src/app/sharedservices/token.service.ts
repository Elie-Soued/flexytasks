import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setToken, getToken } from '../../store/token.actions';
import { selectedToken } from '../../store/token.selectors';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private store: Store<{ token: string }>) {}

  setToken(accessToken: string): void {
    this.store.dispatch(setToken({ token: accessToken }));
  }

  getToken(): string {
    let token = '';
    this.store.dispatch(getToken());
    this.store.select(selectedToken).subscribe((data) => {
      token = data;
    });
    return token;
  }
}
