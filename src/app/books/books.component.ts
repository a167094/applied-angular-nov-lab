import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { BookListComponent } from './components/book-list.component';

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
  private client = inject(HttpClient);

  books = toSignal(
    this.client
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map((res) => res.data)),
  );
}
