import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/book-list.component';
import { BooksService } from './services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, JsonPipe, BookListComponent],
  template: ` <p>Books</p>
    <app-book-list [books]="books()" />`,
  styles: ``,
})
export class BooksComponent {
  private service = inject(BooksService);

  books = toSignal(this.service.getBooks());
}
