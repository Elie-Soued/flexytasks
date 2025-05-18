import { Component, Input } from '@angular/core';
import { PaginationService } from '../../service/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  providers: [],
})
export class PaginationComponent {
  @Input() limit = 5;
  offset = 0;
  totalCount = 0;
  private offsetSub: Subscription = new Subscription();
  private totalCountSub: Subscription = new Subscription();

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.offsetSub = this.paginationService.offset$.subscribe((data) => {
      this.offset = data;
    });

    this.totalCountSub = this.paginationService.totalCount$.subscribe(
      (data) => {
        this.totalCount = data;
      }
    );
  }

  nextPage(): void {
    this.paginationService.emitNextPage();
  }

  previousPage(): void {
    this.paginationService.emitPreviousPage();
  }

  ngOnDestroy(): void {
    this.offsetSub?.unsubscribe();
    this.totalCountSub?.unsubscribe();
  }
}
