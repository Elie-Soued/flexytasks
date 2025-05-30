import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { PaginationService } from '../../pagination/pagination.service';
import { TaskService } from './task.service';
import { TokenService } from '../../sharedservices/token.service';
import { of } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let paginationService: jasmine.SpyObj<PaginationService>;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    paginationService = jasmine.createSpyObj('PaginationService', [
      'addPaginationParams',
      'updateTotalCount',
    ]);

    tokenService = jasmine.createSpyObj('TokenService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PaginationService, useValue: paginationService },
        { provide: HttpClient, useValue: httpClient },
        { provide: TokenService, useValue: tokenService },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  it('getAllTasks correctly executed', () => {
    let tokenServiceMock = 'myToken';
    tokenService.getToken.and.returnValue(tokenServiceMock);

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
    httpClient.get.and.returnValue(of(httpMock));

    service.getAllTasks();

    expect(httpClient.get).toHaveBeenCalledWith(
      `${BASE_URL}/tasks`,

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
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
    httpClient.post.and.returnValue(of(httpMock));

    service.addTask('Hello3');

    expect(httpClient.post).toHaveBeenCalledWith(
      `${BASE_URL}/tasks`,

      {
        newTask: 'Hello3',
      },

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
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
    httpClient.delete.and.returnValue(of(httpMock));

    service.deleteAllTasks();

    expect(httpClient.delete).toHaveBeenCalledWith(
      `${BASE_URL}/tasks`,

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
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
    httpClient.delete.and.returnValue(of(httpMock));

    service.deleteTask(2);

    expect(httpClient.delete).toHaveBeenCalledWith(
      `${BASE_URL}/tasks/2`,

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
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
    httpClient.put.and.returnValue(of(httpMock));

    service.editTask(1, 'helloEdited');

    expect(httpClient.put).toHaveBeenCalledWith(
      `${BASE_URL}/tasks/1`,

      {
        updatedTask: 'helloEdited',
      },

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
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
    httpClient.put.and.returnValue(of(httpMock));

    service.checkTask(true, 1);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${BASE_URL}/tasks/1`,

      {
        checkedTask: true,
      },

      {
        headers: {
          authorization: tokenServiceMock,
        },

        params: paginationParamsMock,
      }
    );
  });
});
