// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import Button from '@atlaskit/button';
import AddTodoModal from './AddTodoModal';

interface IProps {
    contextPath : string,
    reloadTableData : () => void
}
export default function AddTodoView(props : IProps) {
  const { contextPath, reloadTableData } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = (reload : boolean = false) => {
    setIsModalOpen(false);
    if (reload) {
      reloadTableData();
    }
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Button onClick={onModalOpen}>Add Todo8 - changes</Button>
      <AddTodoModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        contextPath={contextPath}
        todo={undefined}
      />
    </>
  );
}
