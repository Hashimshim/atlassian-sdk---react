// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { ITodo } from '../models/Todo';
import { getAllTodos } from '../services/todo-service';

interface IProps {
    contextPath : string
}

export default function TableDataViewer(props : IProps) {
  const { contextPath } = props;
  const [todos, setTodos] = useState<ITodo[]>([]);

  const head = {
    cells: [
      {
        key: 'id',
        content: 'Id',
        isSortable: true,
      },
      {
        key: 'name',
        content: 'Name',
        isSortable: true,
      },
      {
        key: 'description',
        content: 'Description',
        isSortable: true,
      },
      {
        key: 'complete',
        content: 'Complete',
        isSortable: true,
      },
    ],
  };

  const reloadTableData = async () => {
    setTodos(await getAllTodos(contextPath));
  };

  useEffect(() => {
    (async () => {
      await reloadTableData();
    })();
  }, [1]);

  const getTableRows = () => todos.map((todo, index: number) => ({
    key: `row-${index}-${todo.id}`,
    cells: [
      {
        key: todo.id,
        content: todo.id,
      },
      {
        key: todo.name,
        content: todo.name,
      },
      {
        key: todo.description,
        content: todo.description,
      },
      {
        key: todo.complete,
        content: todo.complete,
      },
    ],
  }));

  return (
    <DynamicTable
      head={head}
      // @ts-expect-error
      rows={getTableRows()}
      rowsPerPage={5}
      defaultPage={1}
      loadingSpinnerSize="large"
      isRankable
    />
  );
}
