import { ITodo } from 'shared/types/models';
import { IPlainAction, IAction } from 'shared/types/redux';

export interface ITodosState {
  todos: ITodo[];
}

export type ITodoCreationFields = Omit<ITodo, 'id'>;

type LoadTodos = IPlainAction<'MANAGE_TODOS:LOAD_TODOS'>;
type LoadTodosComplete = IAction<'MANAGE_TODOS:LOAD_TODOS_COMPLETE', { todos: ITodo[] }>;

type CreateTodo = IAction<'MANAGE_TODOS:CREATE_TODO', ITodoCreationFields>;
type CreateTodoComplete = IAction<'MANAGE_TODOS:CREATE_TODO_COMPLETE', { todo: ITodo }>;

type DeleteTodo = IAction<'MANAGE_TODOS:DELETE_TODO', { todoId: string }>;
type DeleteTodoComplete = IAction<'MANAGE_TODOS:DELETE_TODO_COMPLETE', { todoId: string }>;

export type Action =
  LoadTodos | LoadTodosComplete
  | CreateTodo | CreateTodoComplete
  | DeleteTodo | DeleteTodoComplete
  ;
