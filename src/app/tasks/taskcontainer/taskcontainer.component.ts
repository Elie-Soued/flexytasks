import {
  Component,
  effect,
  inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from '../../pagination/pagination.component';

import { PaginationService } from '../../pagination/pagination.service';
import { TaskService } from '../taskService/task.service';

@Component({
  selector: 'app-taskcontainer',
  imports: [TaskComponent, PaginationComponent, FormsModule, FontAwesomeModule],
  templateUrl: './taskcontainer.component.html',
})
export class TaskcontainerComponent implements OnInit {
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

  offset = 0;
  limit = 0;
  totalCount = 0;

  constructor(
    private paginationService: PaginationService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
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

  deleteAll(): void {
    this.taskService.deleteAllTasks();
  }

  addTask(): void {
    this.taskService.addTask(this.newTask);
    this.newTask = '';
  }
}
