import { Component, effect, Injector } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  providers: [],
})
export class PaginationComponent {
  limit = 0;
  offset = 0;
  totalCount = 0;

  constructor(
    private paginationService: PaginationService,
    private injector: Injector
  ) {}

  ngOnInit() {
    effect(
      () => {
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
