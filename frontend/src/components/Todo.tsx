// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';

interface IProps {
    contextPath : string
  }

export default function Todo(props: IProps) {
  const { contextPath } = props;

  const [todo, setTodo] = useState<string>('');
  useEffect(() => {
    (async () => {
      await (
        await fetch(
          `${contextPath}/rest/app/1.0/todo`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ a: 1, b: 'Textual content' }),
          },
        )
      ).json();
      const data = await (
        await fetch(`${contextPath}/rest/app/1.0/todo`)
      ).json();
      setTodo(JSON.stringify(data));
    })();
  }, [1]);
  return (
    <div>
      TODO
      {JSON.stringify(todo)}
    </div>
  );
}
