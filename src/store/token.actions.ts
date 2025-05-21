import { createAction, props } from '@ngrx/store';

export const getToken = createAction('[token] get');

export const setToken = createAction(
  '[token] setToken',
  props<{ token: string }>()
);
