// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import Button from '@atlaskit/button';
import AddTodoModal from './AddTodoModal';

interface IProps {
    contextPath : string
}
export default function AddTodoView(props : IProps) {
  const { contextPath } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Button onClick={onModalOpen}>Add Todo</Button>
      <AddTodoModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        contextPath={contextPath}
      />
    </>
  );
}
