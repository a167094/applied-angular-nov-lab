import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './services/books.service';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksService],
    component: BooksComponent,
  },
];
