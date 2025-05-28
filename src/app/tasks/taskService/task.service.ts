import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { PaginationService } from '../../pagination/pagination.service';
import { TokenService } from '../../sharedservices/token.service';

export type task = {
  id: number;
  content: string;
  checked: boolean;
  userID: number;
};

type tasksResponse = {
  meta: {
    totalCount: number;
  };

  tasks: task[];
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<task[]>([]);

  constructor(
    private paginationService: PaginationService,
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getAllTasks() {
    this.httpClient
      .get<tasksResponse>(
        `${BASE_URL}/tasks`,

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.meta.totalCount);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }

  addTask(newTask: string) {
    this.httpClient
      .post<tasksResponse>(
        `${BASE_URL}/tasks`,

        {
          newTask,
        },

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.meta.totalCount);
        },
        error: (error: Error) => {
          console.log('error :>> ', error);
        },
      });
  }

  deleteAllTasks() {
    this.httpClient
      .delete<tasksResponse>(`${BASE_URL}/tasks`, {
        headers: {
          authorization: this.tokenService.getToken(),
        },

        params: this.paginationService.prepareParams(),
      })
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.meta.totalCount);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  deleteTask(id: number): void {
    this.httpClient
      .delete<tasksResponse>(
        `${BASE_URL}/tasks/${id}`,

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.meta.totalCount);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  editTask(id: number, updatedTask: string): void {
    this.httpClient
      .put<tasksResponse>(
        `${BASE_URL}/tasks/${id}`,

        {
          updatedTask,
        },

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }

  checkTask(checked: boolean, id: number): void {
    this.httpClient
      .put<tasksResponse>(
        `${BASE_URL}/tasks/${id}`,
        {
          checkedTask: checked,
        },

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: tasksResponse) => {
          this.tasks.set(response.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }
}
