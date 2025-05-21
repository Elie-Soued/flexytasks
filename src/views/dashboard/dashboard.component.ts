import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TaskcontainerComponent } from '../../components/taskcontainer/taskcontainer.component';
import { QueryService } from '../../service/query.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRightFromBracket,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { type task, type taskResponse } from '../../types/type';
import { PaginationService } from '../../service/pagination.service';
import { Subscription } from 'rxjs';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-dashboard',
  imports: [TaskcontainerComponent, FormsModule, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  providers: [QueryService, Router, PaginationService],
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  token = '';
  tasks: task[] = [];
  logoutIcon = faRightFromBracket;
  deleteAll = faTrashAlt;
  // Pagination Variables
  totalCount = 0;
  offset = 0;
  limit = 5;

  // Subscriptions
  private nextPageSub: Subscription = new Subscription();
  private previousPageSub: Subscription = new Subscription();
  private queryService = inject(QueryService);

  constructor(
    private router: Router,
    private tokenService: TokenService,
    public paginationService: PaginationService
  ) {
    this.token = this.tokenService.getToken();
  }

  ngOnInit(): void {
    this.getAllTasks();

    this.nextPageSub = this.paginationService.nextPage$.subscribe(() => {
      this.offset = this.offset + this.limit;
      this.paginationService.emitOffset(this.offset);
      this.getAllTasks();
    });

    this.previousPageSub = this.paginationService.previousPage$.subscribe(
      () => {
        this.offset = this.offset - this.limit;
        this.paginationService.emitOffset(this.offset);
        this.getAllTasks();
      }
    );
  }

  getAllTasks(): void {
    const params = new HttpParams()
      .set('offset', this.offset.toString())
      .set('limit', this.limit.toString());

    this.queryService
      .get(
        environment.URL,
        {
          authorization: this.token,
        },

        params
      )
      .subscribe({
        next: (response: taskResponse) => {
          this.tasks = response.tasks;
          this.totalCount = response.meta.totalCount;
          this.paginationService.emitTotalCount(this.totalCount);
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

  ngOnDestroy(): void {
    this.nextPageSub?.unsubscribe();
    this.previousPageSub?.unsubscribe();
  }
}
