import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { type taskResponse } from '../type';

type authHeader = {
  authorization: string;
};

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {}

  post<TResponse, TBody>(
    url: string,
    body: TBody,
    headers?: authHeader,
    params?: HttpParams
  ): Observable<TResponse> {
    return this.http.post<TResponse>(url, body, { headers, params });
  }

  get(
    url: string,
    headers: authHeader,
    params: HttpParams
  ): Observable<taskResponse> {
    return this.http.get<taskResponse>(url, { headers, params });
  }

  delete(
    url: string,
    headers: authHeader,
    params: HttpParams
  ): Observable<taskResponse> {
    return this.http.delete<taskResponse>(url, { headers, params });
  }

  update<TBody>(
    url: string,
    body: TBody,
    headers: authHeader,
    params: HttpParams
  ): Observable<taskResponse> {
    return this.http.put<taskResponse>(url, body, { headers, params });
  }
}
