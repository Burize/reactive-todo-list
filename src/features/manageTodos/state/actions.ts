import { Api } from 'services/api';

import { actions$ } from './createState';
import { ITodoCreationFields } from '../namespace';

const api = new Api();

export function loadTodos() {
  api.todo.loadTodos().subscribe(todos => {
    actions$.next({ type: 'MANAGE_TODOS:LOAD_TODOS_COMPLETE', payload: { todos } });
  });
}

export function createTodo(creationFields: ITodoCreationFields) {
  api.todo.createTodo(creationFields).subscribe(todo => {
    actions$.next({ type: 'MANAGE_TODOS:CREATE_TODO_COMPLETE', payload: { todo } });
  });
}

export function deleteTodo(todoId: string) {
  api.todo.deleteTodo(todoId).subscribe(_ => {
    actions$.next({ type: 'MANAGE_TODOS:DELETE_TODO_COMPLETE', payload: { todoId } });
  });
}
