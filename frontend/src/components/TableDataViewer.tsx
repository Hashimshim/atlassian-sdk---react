// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import { ITodo } from '../models/Todo';
import { deleteTodoFromDB, getAllTodos } from '../services/todo-service';
import AddTodoView from './add-todo/AddTodoView';
import AddTodoModal from './add-todo/AddTodoModal';

interface IProps {
    contextPath : string
}

export default function TableDataViewer(props : IProps) {
  const { contextPath } = props;
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isEditTodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState < ITodo | undefined>(undefined);
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
      {
        key: 'more',
        shouldTruncate: true,
      },
    ],
  };

  const reloadTableData = async () => {
    setTodos(await getAllTodos(contextPath));
  };

  const editTodo = (todo : ITodo) => {
    setSelectedTodo(todo);
    setIsTodoModalOpen(true);
  };

  const deleteTodo = async (id : number) => {
    await deleteTodoFromDB(id, contextPath);
    reloadTableData();
  };

  const closeModal = (reload: boolean = true) => {
    setIsTodoModalOpen(false);
    setSelectedTodo(undefined);
    if (reload) {
      reloadTableData();
    }
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
        content: todo.complete ? 'true' : 'false',
      },
      {
        key: 'MoreDropdown',
        content: (
          <DropdownMenu trigger="More">
            <DropdownItemGroup>
              <DropdownItem>
                <Button
                  appearance="subtle-link"
                  onClick={() => editTodo(todo)}
                >
                  Edit9
                </Button>
              </DropdownItem>
              <DropdownItem>
                <Button
                  appearance="subtle-link"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        ),
      },
    ],
  }));

  return (
    <>
      <AddTodoView contextPath={contextPath} reloadTableData={reloadTableData} />
      <DynamicTable
        head={head}
      // @ts-expect-error
        rows={getTableRows()}
        rowsPerPage={20}
        defaultPage={1}
        loadingSpinnerSize="large"
        isRankable
      />
      <AddTodoModal
        isOpen={isEditTodoModalOpen}
        closeModal={closeModal}
        contextPath={contextPath}
        todo={selectedTodo}
      />
    </>
  );
}
