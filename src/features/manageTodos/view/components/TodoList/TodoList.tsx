import * as React from 'react';

import { ITodo } from 'shared/types/models';
import { block } from 'shared/helpers/bem';

import './TodoList.scss';
import { useObservable } from 'shared/helpers/reactive';
import { Icon } from 'shared/view/elements';

const b = block('todo-list');

interface IProps {
  todos: ITodo[];
  onDelete(id: string): void;
}

function TodoList(props: IProps) {
  const { todos, onDelete } = props;

  const [selectedTodoId, setSelectedId] = useObservable<string, string>(selectedId$ => {
    return selectedId$;
  }, todos[0] && todos[0].id);

  const removeTodo = React.useCallback(() => {
    selectedTodoId && onDelete(selectedTodoId);
  }, [selectedTodoId]);
  return (
    <div className={b()}>
      {todos.map(todo => {
        const isSelected = todo.id === selectedTodoId;
        return (
          <div
            key={todo.id}
            className={b('todo', { selected: isSelected })}
            onClick={setSelectedId.bind(null, todo.id)}
          >
            <span>{todo.title}</span>
            {isSelected && <span onClick={removeTodo}>{<Icon type="delete" />}</span>}
          </div>);
      })}
    </div>
  );
}

export default TodoList;
