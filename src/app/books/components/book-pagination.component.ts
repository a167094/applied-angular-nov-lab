import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-book-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    <button
      class="join-item btn"
      [disabled]="store.currentPage() === 1"
      (click)="store.pageBack(1)"
    >
      «
    </button>
    <button class="join-item btn">Page {{ store.currentPage() }}</button>
    <button
      class="join-item btn"
      [disabled]="store.totalPages() === store.currentPage()"
      (click)="store.pageForward(1)"
    >
      »
    </button>
  </div>`,
  styles: ``,
})
export class BookPaginationComponent {
  store = inject(BooksStore);
}
