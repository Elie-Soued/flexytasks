import { Component, effect } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  limit = 0;
  offset = 0;
  totalCount = 0;

  constructor(private paginationService: PaginationService) {
    effect(() => {
      // We track offset, totalCount and limit to enable/disable the previous and next buttons
      this.offset = this.paginationService.offset();
      this.totalCount = this.paginationService.totalCount();
      this.limit = this.paginationService.limit();
    });
  }

  nextPage(): void {
    this.paginationService.updateOffset(this.offset + this.limit);
  }

  previousPage(): void {
    this.paginationService.updateOffset(this.offset - this.limit);
  }
}
