import { TaskService } from '../../service/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryService } from '../../service/query.service';
import { PaginationService } from '../../service/pagination.service';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { type task, type taskResponse } from '../../type';
import { Component, Input, effect, inject, Injector } from '@angular/core';
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faStrikethrough,
  faBroom,
} from '@fortawesome/free-solid-svg-icons';

type updatedTask = {
  updatedTask: string;
};

type checkedTask = {
  checkedTask: boolean;
};

@Component({
  selector: 'app-task',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: task;

  // Icons
  delete = faTrash;
  edit = faEdit;
  check = faCheck;
  undo = faTimes;
  broom = faBroom;
  strikethrough = faStrikethrough;

  //Variables related to the task
  updatedTask = '';
  checked = false;
  disabled = true;

  //Pagination values that are updated
  offset = 0;
  totalCount = 0;
  limit = 0;

  private injector = inject(Injector);

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
      },
      { injector: this.injector }
    );
  }

  deleteTask(): void {
    const params = this.prepareParams();

    this.queryService
      .delete(
        `tasks/${this.task.id}`,

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.taskService.updateTasks(response.tasks);
        },
        error: (error: unknown) => {
          console.error(error);
        },
      });
  }

  enableTask(): void {
    this.disabled = false;
  }

  disableTask(): void {
    this.task.content = '';
  }

  updateTask(): void {
    const params = this.prepareParams();

    this.queryService
      .update<updatedTask>(
        `tasks/${this.task.id}`,

        {
          updatedTask: this.task.content,
        },

        params
      )
      .subscribe({
        next: (tasks: taskResponse) => {
          this.taskService.updateTasks(tasks.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });

    this.disabled = true;
  }

  checkTask(checked: boolean): void {
    const params = this.prepareParams();

    this.queryService
      .update<checkedTask>(
        `tasks/${this.task.id}`,
        {
          checkedTask: checked,
        },

        params
      )
      .subscribe({
        next: (tasks: taskResponse) => {
          this.taskService.updateTasks(tasks.tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });

    this.disabled = true;
  }

  prepareParams(): HttpParams {
    return new HttpParams()
      .set('offset', this.paginationService.offset().toString())
      .set('limit', this.paginationService.limit().toString());
  }
}
