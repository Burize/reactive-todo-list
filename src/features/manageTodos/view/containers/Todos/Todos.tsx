import * as React from 'react';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Spinner, Modal, Button } from 'shared/view/elements';
import { useObservable, useCommunicationObserver } from 'shared/helpers/reactive';
import { ITodo } from 'shared/types/models';
import { block } from 'shared/helpers/bem';

import { TodoList, NewTodo } from '../../components';
import { selectors, actions } from '../../../state';

import './Todos.scss';

const b = block('todos');

function Todos() {

  const [todos] = useObservable<ITodo[], ITodo>(() => (
    selectors.selectTodos()
  ));

  const [loadingTodos] = useCommunicationObserver(() => (
    selectors.selectCommunication('loadingTodos')
  ));

  const [creatingTodo] = useCommunicationObserver(() => (
    selectors.selectCommunication('creatingTodo')
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

  const [error, setError] = useObservable<string, string>((event$) => {
    return merge(
      selectors.selectCommunication('creatingTodo').pipe(map(communication => communication.error)),
      event$);
  }, '');

  return (
    <>
      <div className={b()}>
        <Spinner spinning={loadingTodos.isRequesting} size="large" tip="Loading ...">
          <NewTodo onCreate={createTodo} isLoading={creatingTodo.isRequesting} />
          {todos && <TodoList todos={todos} onDelete={deleteTodo} />}
        </Spinner>
      </div>
      <Modal
        title="There is some error ..."
        visible={!!error}
        footer={[
          <Button key="submit" type="primary" onClick={setError.bind(null, false)}>
            ok
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
    </>
  );
}

export default Todos;
