import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-book-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
          <tr class="hover">
            <td></td>
            <td>
              {{ book.id }}
            </td>
            <td>
              {{ book.title }}
            </td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class BookListComponent {
  books = input.required<
    { id: string; title: string; author: string; year: number }[] | undefined
  >();
}
