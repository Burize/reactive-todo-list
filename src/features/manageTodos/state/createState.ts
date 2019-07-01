import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

import { ITodosState, Action } from '../namespace';
import { initialState } from './initial';



export const actions$ = new Subject<Action>();

export const todosState$ = actions$.pipe(
  scan((prevState, action) => {
    return reduceState(prevState, action);
  }, initialState),
);

function reduceState(state: ITodosState, action: Action): ITodosState {

  switch (action.type) {
    case 'MANAGE_TODOS:LOAD_TODOS_COMPLETE':
      const { todos } = action.payload;
      return { ...state, todos };
    case 'MANAGE_TODOS:CREATE_TODO_COMPLETE':
      const { todo } = action.payload;
      return { ...state, todos: state.todos.concat(todo) };
    case 'MANAGE_TODOS:DELETE_TODO_COMPLETE':
      const { todoId } = action.payload;
      return { ...state, todos: state.todos.filter(todo => todo.id !== todoId) };
    default:
      return state;
  }
}
