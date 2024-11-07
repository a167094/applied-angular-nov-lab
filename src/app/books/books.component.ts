import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { BookListComponent } from './components/book-list.component';
import { BooksStore } from './services/books.store';
import { BookPaginationComponent } from './components/book-pagination.component';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookListComponent, BookPaginationComponent],
  template: ` <p>Books</p>
    <div class="join">
      <button
        (click)="store.setPrefs(5)"
        [disabled]="store.prefs() === 5"
        class="btn join-item"
      >
        5
      </button>
      <button
        (click)="store.setPrefs(10)"
        [disabled]="store.prefs() === 10"
        class="btn join-item"
      >
        10
      </button>
      <button
        (click)="store.setPrefs(25)"
        [disabled]="store.prefs() === 25"
        class="btn join-item"
      >
        25
      </button>
      <button
        (click)="store.setPrefs(store.books().length)"
        [disabled]="store.prefs() === store.books().length"
        class="btn join-item"
      >
        All
      </button>
    </div>
    <app-book-pagination />
    <app-book-list [books]="books()" />`,
  styles: ``,
})
export class BooksComponent {
  store = inject(BooksStore);

  books = computed(() => {
    //This is actually one of the worst things I've ever made
    //Please tell me how I can make it better
    return this.store
      .books()
      .slice(
        this.store.currentPage() * this.store.prefs() - this.store.prefs(),
        this.store.currentPage() * this.store.prefs(),
      );
  });
}
