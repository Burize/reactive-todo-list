import { ITodosState } from '../namespace';
import { ITodo } from 'shared/types/models';

const todo1: ITodo = { id: '1', title: 'Todo1', description: 'large text 1' };
const todo2: ITodo = { id: '2', title: 'Todo2', description: 'large text 2' };
const todo3: ITodo = { id: '3', title: 'Todo3', description: 'large text 3' };

const mockTodos = [todo1, todo2, todo3];
export const initialState: ITodosState = {
  todos: mockTodos,
};
