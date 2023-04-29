// eslint-disable-next-line no-use-before-define
import React from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

interface IProps {
    isOpen: boolean
    closeModal: () => void
    contextPath: string
}
export default function AddTodoModal(props : IProps) {
  const { isOpen, closeModal, contextPath } = props;
  console.log(contextPath);
  return (
    <ModalTransition>
      {isOpen && (
      <Modal onClose={closeModal}>
        <ModalHeader>
          <ModalTitle>Add Todo</ModalTitle>
        </ModalHeader>
        <ModalBody>
          Duplicating this page will make it a child page of
          {' '}

        </ModalBody>
        <ModalFooter>
          <Button appearance="subtle" onClick={closeModal}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={closeModal} autoFocus>
            Duplicate
          </Button>
        </ModalFooter>
      </Modal>
      )}
    </ModalTransition>
  );
}
