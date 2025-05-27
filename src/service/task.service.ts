import { Injectable, signal } from '@angular/core';
import { type task } from '../type';
import { PaginationService } from './pagination.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../environments/environment';

type updatedTask = {
  updatedTask: string;
};

type checkedTask = {
  checkedTask: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<task[]>([]);
  private BASE_URL = environment.BASE_URL;

  constructor(
    private paginationService: PaginationService,
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getAllTasks() {
    console.log('here');

    this.httpClient
      .get(
        `${this.BASE_URL}/tasks`,

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: any) => {
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
      .post<any>(
        `${this.BASE_URL}/tasks`,

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
        next: (response: any) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.totalCount);
        },
        error: (error: Error) => {
          console.log('error :>> ', error);
        },
      });
  }

  deleteAllTasks() {
    this.httpClient
      .delete(`${this.BASE_URL}/tasks`, {
        headers: {
          authorization: this.tokenService.getToken(),
        },

        params: this.paginationService.prepareParams(),
      })
      .subscribe({
        next: (response: any) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.totalCount);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  deleteTask(id: number): void {
    this.httpClient
      .delete(
        `${this.BASE_URL}/tasks/${id}`,

        {
          headers: {
            authorization: this.tokenService.getToken(),
          },

          params: this.paginationService.prepareParams(),
        }
      )
      .subscribe({
        next: (response: any) => {
          this.tasks.set(response.tasks);
          this.paginationService.updateTotalCount(response.totalCount);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  editTask(id: number, updatedTask: string): void {
    this.httpClient
      .put<updatedTask>(
        `${this.BASE_URL}/tasks/${id}`,

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
        next: (response: any) => {
          this.tasks.set(response.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }

  checkTask(checked: boolean, id: number): void {
    this.httpClient
      .put<checkedTask>(
        `${this.BASE_URL}/tasks/${id}`,
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
        next: (response: any) => {
          this.tasks.set(response.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }
}
