import { ITodo } from '../models/Todo';

export const getAllTodos = async (contextPath : string) => (
  await fetch(`${contextPath}/rest/app/1.0/todo`)
).json();

export const addTodoToDB = async (todo : ITodo, contextPath : string) => (
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

export const editTodoInDB = async (todo : ITodo, contextPath : string) => (await fetch(
  `${contextPath}/rest/app/1.0/todo`,
  {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...todo }),
  },
)
).json();

export const deleteTodoFromDB = async (todoId : number, contextPath : string) => (await fetch(
  `${contextPath}/rest/app/1.0/todo/${todoId}`,
  {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
)
).json();
