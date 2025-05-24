import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TaskComponent } from '../task/task.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../service/pagination.service';
import { FormsModule } from '@angular/forms';
import { QueryService } from '../../service/query.service';
import { environment } from '../../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { type task, type taskResponse } from '../../type';

import { TokenService } from '../../service/token.service';

type addNewTaskPayload = {
  newTask: string;
};

@Component({
  selector: 'app-taskcontainer',
  imports: [TaskComponent, PaginationComponent, FormsModule, FontAwesomeModule],
  templateUrl: './taskcontainer.component.html',
})
export class TaskcontainerComponent {
  token = '';
  newTask = '';
  add = faPlus;
  deleteAllIcon = faTrashAlt;
  @Input() offset!: number;
  @Input() tasks!: task[];
  @Input() limit!: number;
  @Input() totalCount!: number;

  constructor(
    private queryService: QueryService,
    private paginationService: PaginationService,
    private tokenService: TokenService
  ) {
    this.token = this.tokenService.getToken();
  }

  private URL = environment.URL;

  updateTask(response: taskResponse): void {
    this.tasks = response.tasks;
    this.totalCount = response.meta.totalCount;
  }

  addTask(): void {
    const params = new HttpParams()
      .set('offset', this.offset.toString())
      .set('limit', this.limit.toString());

    this.queryService
      .post<taskResponse, addNewTaskPayload>(
        this.URL,

        {
          newTask: this.newTask,
        },

        {
          authorization: this.token,
        },
        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.tasks = response.tasks;
          this.totalCount = response.meta.totalCount;
          this.paginationService.emitTotalCount(this.totalCount);
        },
        error: (error: Error) => {
          console.log('error :>> ', error);
        },
      });

    this.newTask = '';
  }

  deleteAll(): void {
    const params = new HttpParams()
      .set('offset', this.offset.toString())
      .set('limit', this.limit.toString());

    this.queryService
      .delete(
        `${environment.URL}`,
        {
          authorization: this.token,
        },

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.tasks = response.tasks;
          this.totalCount = response.meta.totalCount;
          this.paginationService.emitTotalCount(this.totalCount);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }
}
