import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BooksService } from './books.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface BooksState {
  prefs: string;
  books: Books[];
}

const initialState: BooksState = {
  prefs: '',
  books: [],
};

export const BooksStore = signalStore(
  withDevtools('books-store'),
  withState<BooksState>(initialState),
  withMethods((store) => {
    const service = inject(BooksService);
    return {
      loadBooks: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.getBooks().pipe(
              tapResponse({
                next(value) {
                  patchState(store, { books: value });
                },
                error(err) {
                  console.log(err);
                },
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.loadBooks();
    },
  }),
);

export interface Books {
  id: string;
  title: string;
  author: string;
  year: number;
}
