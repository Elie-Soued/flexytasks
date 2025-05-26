import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { type taskResponse } from '../type';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  post<TResponse, TBody>(
    url: string,
    body: TBody,
    params?: HttpParams
  ): Observable<TResponse> {
    return this.http.post<TResponse>(
      `${this.BASE_URL}/${url}`,

      body,
      {
        headers: {
          authorization: this.tokenService.getToken(),
        },
        params,
      }
    );
  }

  get(url: string, params: HttpParams): Observable<taskResponse> {
    return this.http.get<taskResponse>(
      `${this.BASE_URL}/${url}`,

      {
        headers: {
          authorization: this.tokenService.getToken(),
        },

        params,
      }
    );
  }

  delete(url: string, params: HttpParams): Observable<taskResponse> {
    return this.http.delete<taskResponse>(
      `${this.BASE_URL}/${url}`,

      {
        headers: {
          authorization: this.tokenService.getToken(),
        },

        params,
      }
    );
  }

  update<TBody>(
    url: string,
    body: TBody,
    params: HttpParams
  ): Observable<taskResponse> {
    return this.http.put<taskResponse>(`${this.BASE_URL}/${url}`, body, {
      headers: {
        authorization: this.tokenService.getToken(),
      },
      params,
    });
  }
}
