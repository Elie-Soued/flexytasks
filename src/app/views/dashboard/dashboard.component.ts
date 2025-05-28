import { Component, effect, inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRightFromBracket,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../sharedservices/user.service';
import { TaskService } from '../../tasks/taskService/task.service';
import { PaginationService } from '../../pagination/pagination.service';
import { TaskcontainerComponent } from '../../tasks/taskcontainer/taskcontainer.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, FontAwesomeModule, TaskcontainerComponent],
  templateUrl: './dashboard.component.html',
  providers: [],
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  logoutIcon = faRightFromBracket;
  deleteAll = faTrashAlt;
  private injector = inject(Injector);

  constructor(
    public paginationService: PaginationService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit() {
    effect(
      () => {
        if (this.paginationService.offset() !== null) {
          this.getAllTasks();
        }
      },
      { injector: this.injector }
    );
  }

  getAllTasks(): void {
    this.taskService.getAllTasks();
  }

  logout(): void {
    this.userService.logout();
  }
}
