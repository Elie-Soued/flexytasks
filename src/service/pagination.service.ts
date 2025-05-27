import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  offset = signal(0);
  totalCount = signal(0);
  limit = signal(5);

  constructor() {}

  updateOffset(value: number): void {
    this.offset.set(value);
  }

  updateTotalCount(value: number): void {
    this.totalCount.set(value);
  }

  prepareParams(): HttpParams {
    return new HttpParams()
      .set('offset', this.offset().toString())
      .set('limit', this.limit().toString());
  }
}
