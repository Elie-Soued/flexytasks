import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('The value emitted by emitOffset is correctly caught by the subscription on offser$', () => {
  //   service.emitOffset(3);
  //   service.offset$.subscribe((data) => {
  //     expect(data).toEqual(3);
  //   });
  // });
  // it('The value emitted by emitTotalCount is correctly caught by the subscription on totalCount$', () => {
  //   service.emitTotalCount(3);
  //   service.totalCount$.subscribe((data) => {
  //     expect(data).toEqual(3);
  //   });
  // });
  // it('An event is triggered by emitNextPage and this event can be subscripted to using the nextPage$ Observable  ', () => {
  //   service.emitNextPage();
  //   service.nextPage$.subscribe((data) => {
  //     expect(data).toBeUndefined;
  //   });
  // });
  // it('An event is triggered by emitPreviousPage and this event can be subscripted to using the previousPage$ Observable', () => {
  //   service.emitPreviousPage();
  //   service.previousPage$.subscribe((data) => {
  //     expect(data).toBeUndefined;
  //   });
  // });
});
