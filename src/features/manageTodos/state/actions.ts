import { Api } from 'services/api';

import { actions$ } from './entry';
import { ITodoCreationFields } from '../namespace';
import { getErrorMessage } from 'shared/helpers/error';

const api = new Api();

export function loadTodos() {
  actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS' });
  api.todo.loadTodos().subscribe(todos => {
    actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS_COMPLETE', payload: { todos } });
  });
}

export function createTodo(creationFields: ITodoCreationFields) {
  actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO', payload: creationFields });
  api.todo.createTodo(creationFields).subscribe(todo => {
    actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO_COMPLETE', payload: { todo } });
  },
    error => {
      actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO_FAILED', error: getErrorMessage(error) });
    },
  );
}

export function deleteTodo(todoId: string) {
  api.todo.deleteTodo(todoId).subscribe(_ => {
    actions$.next({ type: 'MANAGE_TODOS:DELETE_TODO_COMPLETE', payload: { todoId } });
  });
}
