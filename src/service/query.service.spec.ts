import { TestBed } from '@angular/core/testing';

import { HttpParams } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { QueryService } from './query.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('QueryService', () => {
  let queryService: QueryService;
  let httpTesting: HttpTestingController;
  const testUrl = '/api/data';
  const urlWithParams = '/api/data?offset=0&limit=5';

  const offset = 0;
  const limit = 5;

  const mockResponse = {
    meta: {
      totalCount: 3,
    },
    tasks: [
      { id: 1, content: 'task1', userID: 1, checked: false },
      { id: 2, content: 'task2', userID: 1, checked: false },
      { id: 3, content: 'task3', userID: 1, checked: false },
    ],
  };
  const mockResponseAfterDelete = {
    meta: {
      totalCount: 2,
    },
    tasks: [
      { id: 1, content: 'task1', userID: 1, checked: false },
      { id: 2, content: 'task2', userID: 1, checked: false },
    ],
  };

  const mockResponseAfterUpdate = {
    meta: { totalCount: 3 },
    tasks: [
      { id: 1, content: 'task1', userID: 1, checked: false },
      { id: 2, content: 'task2', userID: 1, checked: false },
      { id: 3, content: 'task4', userID: 1, checked: false },
    ],
  };

  const params = new HttpParams()
    .set('offset', offset.toString())
    .set('limit', limit.toString());

  const body = { username: 'Pilex', password: '123' };

  const updateBody = { updatedTask: 'This is the updatedTask' };

  const header = {
    authorization: 'kakaksjdksjldjljlkjlu',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueryService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    queryService = TestBed.inject(QueryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTesting.verify();
  });

  it('it should perform a GET request like getAll tasks', async () => {
    const response$ = queryService.get(testUrl, header, params);
    const responsePromise = firstValueFrom(response$);
    const req = httpTesting.expectOne(urlWithParams);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(await responsePromise).toEqual(mockResponse);
  });

  it('it should perform a POST request', async () => {
    const response$ = queryService.post(testUrl, body);
    const responsePromise = firstValueFrom(response$);
    const req = httpTesting.expectOne(testUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    expect(await responsePromise).toEqual(mockResponse);
  });

  it('it should perform a DELETE request', async () => {
    const response$ = queryService.delete(testUrl, header, params);
    const responsePromise = firstValueFrom(response$);
    const req = httpTesting.expectOne(urlWithParams);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponseAfterDelete);
    expect(await responsePromise).toEqual(mockResponseAfterDelete);
  });

  it('it should perform a UPDATE request', async () => {
    const response$ = queryService.update(testUrl, updateBody, header, params);
    const responsePromise = firstValueFrom(response$);
    const req = httpTesting.expectOne(urlWithParams);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponseAfterUpdate);
    expect(await responsePromise).toEqual(mockResponseAfterUpdate);
  });
});
