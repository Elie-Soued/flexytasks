import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpParams,
  provideHttpClient,
} from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { PaginationService } from '../../pagination/pagination.service';
import { TaskService } from './task.service';
import { TokenService } from '../../sharedservices/token.service';
import { of } from 'rxjs';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpClient: HttpTestingController;
  let paginationService: jasmine.SpyObj<PaginationService>;
  let tokenService: jasmine.SpyObj<TokenService>;

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
    const tokenServiceMock = 'myToken';
    tokenService.getToken.and.returnValue(tokenServiceMock);

    const paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);

    const httpMock = {
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

    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);

    service.getAllTasks();

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);

    expect(req.request.method).toBe('GET');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(2);
  });

  it('AddTasks is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    let paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);

    let httpMock = {
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

    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.addTask('Hello3');

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);
    expect(req.request.method).toBe('POST');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(2);
  });

  it('deleteAllTasks is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    let paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);

    let httpMock = {
      meta: {
        totalCount: 0,
      },
      tasks: [],
    };

    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.deleteAllTasks();

    const req = httpClient.expectOne(`${BASE_URL}/tasks?offset=0&limit=5`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(0);
  });

  it('deleteTask is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    let paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);
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

    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.deleteTask(2);

    const req = httpClient.expectOne(`${BASE_URL}/tasks/2?offset=0&limit=5`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);

    expect(paginationService.updateTotalCount).toHaveBeenCalledWith(1);
  });

  it('editTask is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    let paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);
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

    paginationService.addPaginationParams.and.returnValue(paginationParamsMock);
    tokenService.getToken.and.returnValue(tokenServiceMock);

    service.editTask(1, 'helloEdited');

    const req = httpClient.expectOne(`${BASE_URL}/tasks/1?offset=0&limit=5`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.params).toEqual(paginationParamsMock);
    expect(req.request.headers.get('authorization')).toBe('myToken');

    req.flush(httpMock);
  });

  it('checkTask is correctly executed', () => {
    let tokenServiceMock = 'myToken';
    let paginationParamsMock = new HttpParams()
      .set('offset', 0)
      .set('limit', 5);
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
  });
});
