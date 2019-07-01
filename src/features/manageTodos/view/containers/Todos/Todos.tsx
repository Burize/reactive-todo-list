import * as React from 'react';
import { from, merge } from 'rxjs';
import { useObservable } from 'shared/helpers/reactive';
import { ITodo } from 'shared/types/models';
import { scan } from 'rxjs/operators';

import { block } from 'shared/helpers/bem';

import { TodoList, NewTodo } from '../../components';
import { selectors, actions } from '../../../state';

import './Todos.scss';

const b = block('todos');

function Todos() {

  const [todos] = useObservable<ITodo[], ITodo>(() => (
    merge(
      selectors.selectTodos(),
    )
  ));

  React.useEffect(() => {
    actions.loadTodos();
  }, []);

  const createTodo = React.useCallback((title: string, description: string) => {
    actions.createTodo({ title, description });
  }, []);

  const deleteTodo = React.useCallback((todoId: string) => {
    actions.deleteTodo(todoId);
  }, []);

  return (
    <div className={b()}>
      <NewTodo onCreate={createTodo} />
      {todos && <TodoList todos={todos} onDelete={deleteTodo} />}
    </div>
  );
}

export default Todos;
