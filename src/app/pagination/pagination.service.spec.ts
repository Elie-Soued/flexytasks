import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { HttpParams } from '@angular/common/http';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should initialize with default values', () => {
    expect(service.offset()).toBe(0);
    expect(service.limit()).toBe(5);
    expect(service.totalCount()).toBe(0);
  });

  it('updateOffset is correctly executed', () => {
    service.updateOffset(10);
    expect(service.offset()).toBe(10);
  });

  it('updateTotalCount is correctly executed', () => {
    service.updateTotalCount(20);
    expect(service.totalCount()).toBe(20);
  });

  it('addPaginationParams is correctly executed', () => {
    service.updateOffset(20);
    const params: HttpParams = service.addPaginationParams();
    expect(params.get('offset')).toBe('20');
    expect(params.get('limit')).toBe('5');
  });
});
