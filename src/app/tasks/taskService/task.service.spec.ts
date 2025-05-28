import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { tokenReducer } from '../../../store/token.reducer';
import { TokenEffects } from '../../../store/token.effects';

describe('TaskService', () => {
  let service: TaskService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        provideStore({ token: tokenReducer }),
        provideEffects([TokenEffects]),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
