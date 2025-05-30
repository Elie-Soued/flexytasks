import { Component, effect, inject, Injector, OnInit } from '@angular/core';
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
  // Icons
  add = faPlus;
  deleteAllIcon = faTrashAlt;

  //Pagination related
  limit = 0;
  totalCount = 0;

  newTask = '';
  tasks = [{}];

  private injector = inject(Injector);

  constructor(
    private paginationService: PaginationService,
    private taskService: TaskService
  ) {
    effect(() => {
      this.taskService.getAllTasks();
    });
  }

  ngOnInit(): void {
    effect(
      () => {
        // We need to track limit and totalCount to display or hide the pagination component
        this.limit = this.paginationService.limit();
        this.totalCount = this.paginationService.totalCount();
        // We need to track tasks since they are used to render individual task
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
