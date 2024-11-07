import { http, HttpResponse } from 'msw';

const features = ['wip', 'home-page-content', 'books-feature'];

const handlers = [
  http.get('/api/features', () => {
    return HttpResponse.json(features);
  }),
];

export default handlers;
