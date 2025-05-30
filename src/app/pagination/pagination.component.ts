import { Component, effect, Injector, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  providers: [],
})
export class PaginationComponent implements OnInit {
  limit = 0;
  offset = 0;
  totalCount = 0;

  constructor(
    private paginationService: PaginationService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    effect(
      () => {
        // We track offset, totalCount and limit to enable/disable the previous and next buttons
        this.offset = this.paginationService.offset();
        this.totalCount = this.paginationService.totalCount();
        this.limit = this.paginationService.limit();
      },
      { injector: this.injector }
    );
  }

  nextPage(): void {
    this.paginationService.updateOffset(this.offset + this.limit);
  }

  previousPage(): void {
    this.paginationService.updateOffset(this.offset - this.limit);
  }
}
