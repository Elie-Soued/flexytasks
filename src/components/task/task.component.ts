import { Component, Input, effect, inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../service/pagination.service';
import { TaskService } from '../../service/task.service';
import { type task } from '../../type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faStrikethrough,
  faBroom,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: task;
  delete = faTrash;
  edit = faEdit;
  check = faCheck;
  undo = faTimes;
  broom = faBroom;
  strikethrough = faStrikethrough;
  updatedTask = '';
  checked = false;
  disabled = true;
  offset = 0;
  totalCount = 0;
  limit = 0;

  private injector = inject(Injector);

  constructor(
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
    this.taskService.deleteTask(this.task.id);
  }

  editTask(): void {
    this.taskService.editTask(this.task.id, this.task.content);
    this.disabled = true;
  }

  checkTask(checked: boolean): void {
    this.taskService.checkTask(checked, this.task.id);
    this.disabled = true;
  }

  enableTask(): void {
    this.disabled = false;
  }

  disableTask(): void {
    this.task.content = '';
  }
}
