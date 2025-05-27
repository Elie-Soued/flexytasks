import { Component, effect, inject, Injector, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TaskcontainerComponent } from '../../components/taskcontainer/taskcontainer.component';
import { QueryService } from '../../service/query.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { type task, type taskResponse } from '../../type';
import { PaginationService } from '../../service/pagination.service';
import { TokenService } from '../../service/token.service';
import { TaskService } from '../../service/task.service';
import {
  faRightFromBracket,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

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
    private router: Router,
    private tokenService: TokenService,
    public paginationService: PaginationService,
    private queryService: QueryService,
    private taskService: TaskService
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
    const params = this.prepareParams();

    this.queryService
      .get(
        'tasks',

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.taskService.updateTasks(response.tasks);
          this.paginationService.updateTotalCount(response.meta.totalCount);
        },
        error: (error: unknown) => {
          console.log('error :>> ', error);
        },
      });
  }

  logout(): void {
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }

  prepareParams() {
    return new HttpParams()
      .set('offset', this.paginationService.offset().toString())
      .set('limit', this.paginationService.limit().toString());
  }
}
