import { Component, effect, inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskcontainerComponent } from '../../components/taskcontainer/taskcontainer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationService } from '../../service/pagination.service';
import { TaskService } from '../../service/task.service';
import {
  faRightFromBracket,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [TaskcontainerComponent, FormsModule, FontAwesomeModule],
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
