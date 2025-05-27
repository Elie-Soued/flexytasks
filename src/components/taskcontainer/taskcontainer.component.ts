import { Component, effect, inject, Injector, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TaskComponent } from '../task/task.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../service/pagination.service';
import { FormsModule } from '@angular/forms';
import { QueryService } from '../../service/query.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { type taskResponse } from '../../type';
import { TaskService } from '../../service/task.service';

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
  tasks = [
    {
      id: 0,
      content: '',
      checked: false,
      userID: 0,
    },
  ];

  private injector = inject(Injector);

  //Pagination related properties
  offset = 0;
  limit = 0;
  totalCount = 0;

  constructor(
    private queryService: QueryService,
    private paginationService: PaginationService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    effect(
      () => {
        this.offset = this.paginationService.offset();
        this.limit = this.paginationService.limit();
        this.totalCount = this.paginationService.totalCount();
        this.tasks = this.taskService.tasks();
      },
      { injector: this.injector }
    );
  }

  updateTask(response: taskResponse): void {
    this.taskService.updateTasks(response.tasks);
    this.paginationService.updateTotalCount(response.meta.totalCount);
  }

  addTask(): void {
    const params = this.prepareParams();

    this.queryService
      .post<taskResponse, addNewTaskPayload>(
        'tasks',

        {
          newTask: this.newTask,
        },

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.updateTask(response);
        },
        error: (error: Error) => {
          console.log('error :>> ', error);
        },
      });

    this.newTask = '';
  }

  deleteAll(): void {
    const params = this.prepareParams();

    this.queryService
      .delete(
        'tasks',

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.updateTask(response);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  prepareParams() {
    return new HttpParams()
      .set('offset', this.paginationService.offset().toString())
      .set('limit', this.paginationService.limit().toString());
  }
}
