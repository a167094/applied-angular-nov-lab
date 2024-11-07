import { inject, signal } from '@angular/core';
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
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';

interface BooksState {
  prefs: number;
  books: Books[];
  currentPage: number;
  totalPages: number;
}

const initialState: BooksState = {
  prefs: 10,
  books: [],
  currentPage: 1,
  totalPages: 1,
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
                  patchState(store, {
                    totalPages: store.books().length / store.prefs(),
                  });
                },
                error(err) {
                  console.log(err);
                },
              }),
            ),
          ),
        ),
      ),
      setPrefs: (prefs: number) =>
        patchState(store, {
          prefs,
          totalPages: store.books().length / prefs,
          currentPage: 1,
        }),
      pageForward: (increase: number) =>
        patchState(store, { currentPage: store.currentPage() + increase }),
      pageBack: (decrease: number) =>
        patchState(store, { currentPage: store.currentPage() - decrease }),
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
