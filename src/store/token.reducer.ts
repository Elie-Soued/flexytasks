import { createReducer, on } from '@ngrx/store';
import { setToken } from './token.actions';

const initialToken = '';

export const tokenReducer = createReducer(
  initialToken,
  on(setToken, (__, action) => action.token)
);
