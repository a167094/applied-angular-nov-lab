import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksStore } from './services/books.store';
import { BooksService } from './services/books.service';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksStore, BooksService],
    component: BooksComponent,
  },
];
