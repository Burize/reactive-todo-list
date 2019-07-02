import { ITodosState, Action } from 'features/manageTodos/namespace';
import * as NS from '../../namespace';
import { scan } from 'rxjs/operators';
import { Subject } from 'rxjs';

export default function createDataObserver(actions$: Subject<NS.Action>, initial: NS.ITodosState) {

  const reduce = (state: ITodosState, action: Action): ITodosState => {

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
  };

  return actions$.pipe(
    scan((prevState, action) => {
      return reduce(prevState, action);
    }, initial),
  );
}
