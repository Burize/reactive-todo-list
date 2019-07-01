import * as React from 'react';
import { map } from 'rxjs/operators';

import { useObservable } from 'shared/helpers/reactive';
import { block } from 'shared/helpers/bem';
import { Button } from 'shared/view/elements';

import './NewTodo.scss';

const b = block('new-todo');

interface IProps {
  onCreate(title: string, description: string): void;
}

function NewTodo(props: IProps) {
  const { onCreate } = props;

  const [title, setTitle] = useObservable<string, React.ChangeEvent<HTMLInputElement>>((event$) => {
    return event$.pipe(map(event => event.target.value));
  }, 'new todo');

  const [description, setDescription] = useObservable<string, React.ChangeEvent<HTMLTextAreaElement>>((event$) => {
    return event$.pipe(map(event => event.target.value));
  }, 'write something interesting');

  const createTodo = React.useCallback(() => {
    title && description && onCreate(title, description); // TODO: try rework
  }, [title, description, onCreate]);

  return (
    <div className={b()}>
      <input onChange={setTitle} value={title} />
      <textarea onChange={setDescription} value={description} />
      <Button onClick={createTodo}>Create</Button>
    </div>
  );
}

export default NewTodo;
