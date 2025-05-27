import { Component, effect, inject, Injector, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../service/pagination.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../service/task.service';

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

  deleteAll(): void {
    this.taskService.deleteAllTasks();
  }

  addTask(): void {
    this.taskService.addTask(this.newTask);
    this.newTask = '';
  }
}
