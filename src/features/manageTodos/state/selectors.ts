import { todosState$ } from './createState';
import { map } from 'rxjs/operators';

import { Api } from 'services/api';

const api = new Api();

export function selectTodos() {
  return todosState$.pipe(
    map(state => state.todos),
  );
}
