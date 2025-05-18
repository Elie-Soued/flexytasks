import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private nextPageService = new Subject<void>();
  private previousPageService = new Subject<void>();
  private offsetService = new BehaviorSubject<number>(0);
  private totalCountService = new BehaviorSubject<number>(0);

  public nextPage$ = this.nextPageService.asObservable();
  public previousPage$ = this.previousPageService.asObservable();
  public offset$ = this.offsetService.asObservable();
  public totalCount$ = this.totalCountService.asObservable();

  constructor() {}

  emitNextPage(): void {
    this.nextPageService.next();
  }

  emitPreviousPage(): void {
    this.previousPageService.next();
  }

  emitOffset(value: number): void {
    this.offsetService.next(value);
  }

  emitTotalCount(value: number): void {
    this.totalCountService.next(value);
  }
}
