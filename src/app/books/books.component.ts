import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookListComponent } from './components/book-list.component';
import { BooksStore } from './services/books.store';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookListComponent],
  template: ` <p>Books</p>
    <app-book-list [books]="books()" />`,
  styles: ``,
})
export class BooksComponent {
  private service = inject(BooksStore);

  books = this.service.books;
}
