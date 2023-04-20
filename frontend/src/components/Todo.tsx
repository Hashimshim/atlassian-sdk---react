// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';

interface IProps {
  contextPath : string
}
interface Todo {
  name: string
  description: string
  complete: boolean
}
export default function Todo(props: IProps) {
  const { contextPath } = props;

  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
        const todo : Todo = {
            description: "my description from frontend", name: 'my name', complete: true
        }
      await (
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
      const data = await (
        await fetch(`${contextPath}/rest/app/1.0/todo`)
      ).json();
      setTodos(data);
    })();
  }, [1]);
  return (
    <div>
      TODO
        {todos.map((todo) => (<><p>name: {todo.name}</p><p>description: {todo.description}</p><p>complete: {todo.complete.toString()}</p></>))}
    </div>
  );
}
