import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { setToken, getToken } from './token.actions';
import { switchMap, tap, withLatestFrom, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenEffects {
  getToken;
  setToken;

  constructor(
    private action$: Actions,
    private store: Store<{ token: string }>
  ) {
    this.getToken = createEffect(() =>
      this.action$.pipe(
        ofType(getToken),
        switchMap(() => {
          const storedToken = localStorage.getItem('accessToken');

          if (storedToken) {
            return of(setToken({ token: storedToken }));
          }

          return of(setToken({ token: '' }));
        })
      )
    );

    this.setToken = createEffect(
      () =>
        this.action$.pipe(
          ofType(setToken),
          withLatestFrom(this.store.select('token')),
          tap(([_, token]) => {
            localStorage.setItem('accessToken', token);
          })
        ),
      { dispatch: false }
    );
  }
}
