import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryService } from '../../service/query.service';
import { PaginationService } from '../../service/pagination.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { type task, type taskResponse } from '../../type';

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
export class TaskComponent implements OnInit, OnDestroy {
  //Inputs and Outputs
  @Input() task!: task;
  @Input() limit!: number;
  @Output() removeTask = new EventEmitter();
  @Output() editTask = new EventEmitter();

  //Subscriptions
  private offsetSub: Subscription = new Subscription();
  private totalCountSub: Subscription = new Subscription();

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

  // Pagination values that are updated
  offset = 0;
  totalCount = 0;

  constructor(
    private queryService: QueryService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.updatedTask = this.task.content;
    this.checked = this.task.checked;

    this.offsetSub = this.paginationService.offset$.subscribe((data) => {
      this.offset = data;
    });

    this.totalCountSub = this.paginationService.totalCount$.subscribe(
      (data) => {
        this.totalCount = data;
      }
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
          this.removeTask.emit(response);
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
    this.updatedTask = '';
  }

  updateTask(): void {
    const params = this.prepareParams();

    this.queryService
      .update<updatedTask>(
        `tasks/${this.task.id}`,

        {
          updatedTask: this.updatedTask,
        },

        params
      )
      .subscribe({
        next: (tasks: taskResponse) => {
          this.editTask.emit(tasks);
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
          this.editTask.emit(tasks);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });

    this.disabled = true;
  }

  ngOnDestroy(): void {
    this.offsetSub?.unsubscribe();
    this.totalCountSub?.unsubscribe();
  }

  prepareParams(): HttpParams {
    return new HttpParams()
      .set('offset', this.offset.toString())
      .set('limit', this.limit.toString());
  }
}
