import { TestBed } from '@angular/core/testing';
import { HttpParams, provideHttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { PaginationService } from '../../pagination/pagination.service';
import { TaskService } from './task.service';
import { TokenService } from '../../sharedservices/token.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpClient: HttpTestingController;
  let paginationService: jasmine.SpyObj<PaginationService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let httpMock = {
    meta: {
      totalCount: 1,
    },
    tasks: [
      {
        id: 1,
        content: 'hello',
        checked: false,
        userID: 100,
      },
    ],
  };

  let httpEmptyMock = {
    meta: {
      totalCount: 0,
    },
    tasks: [],
  };

  let httpMockMany = {
    meta: {
      totalCount: 2,
    },
    tasks: [
      {
        id: 1,
        content: 'hello',
        checked: false,
        userID: 100,
      },
      {
        id: 2,
        content: 'hello 2',
        checked: false,
        userID: 200,
      },
    ],
  };

  let tokenServiceMock = 'myToken';
  let paginationParamsMock = new HttpParams().set('offset', 0).set('limit', 5);

  beforeEach(() => {
    paginationService = jasmine.createSpyObj('PaginationService', [
      'addPaginationParams',
      'updateTotalCount',
    ]);

    tokenService = jasmine.createSpyObj('TokenService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        { provide: PaginationService, useValue: paginationService },
        { provide: TokenService, useValue: tokenService },
      ],
    });

    service = TestBed.inject(TaskService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('getAllTasks correctly executed', () => {
    tokenService.getToken.and.returnValue(tokenServiceMock);
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);

    service.getAllTasks();

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);

    expect(req.request.method).toBe('GET');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMockMany);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(2);
    expect(service.tasks()).toEqual(httpMockMany.tasks);
  });

  it('AddTasks is correctly executed', () => {
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.addTask('Hello3');

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);
    expect(req.request.method).toBe('POST');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMockMany);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(2);
    expect(service.tasks()).toEqual(httpMockMany.tasks);
  });

  it('deleteAllTasks is correctly executed', () => {
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.deleteAllTasks();

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpEmptyMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(0);
    expect(service.tasks()).toEqual(httpEmptyMock.tasks);
  });

  it('deleteTask is correctly executed', () => {
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.deleteTask(2);

    const req = httpClient.expectOne(`${BASE_URL}/tasks/2?offset=0&limit=5`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(1);
    expect(service.tasks()).toEqual(httpMock.tasks);
  });

  it('editTask is correctly executed', () => {
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.editTask(1, 'helloEdited');

    const req = httpClient.expectOne(`${BASE_URL}/tasks/1?offset=0&limit=5`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);
    expect(service.tasks()).toEqual(httpMock.tasks);
  });

  it('checkTask is correctly executed', () => {
    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.checkTask(true, 1);

    const req = httpClient.expectOne(`${BASE_URL}/tasks/1?offset=0&limit=5`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      checkedTask: true,
    });
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);
    expect(service.tasks()).toEqual(httpMock.tasks);
  });
});
