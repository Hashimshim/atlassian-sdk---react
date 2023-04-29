import { ITodo } from '../models/Todo';

export const getAllTodos = async (contextPath : string) => (
  await fetch(`${contextPath}/rest/app/1.0/todo`)
).json();

export const addTodo = async (contextPath : string, todo : ITodo) => (
  await fetch(
    `${contextPath}/rest/app/1.0/todo`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo }),
    },
  )
).json();
