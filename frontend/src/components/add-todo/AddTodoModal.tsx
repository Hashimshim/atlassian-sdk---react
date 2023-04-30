// eslint-disable-next-line no-use-before-define
import React from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Form from '@atlaskit/form';
import Button from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import { ITodo } from '../../models/Todo';
import IdField from './form/IdField';
import NameField from './form/NameField';
import DescriptionField from './form/DescriptionField';
import CompleteField from './form/CompleteField';
import { addTodoToDB, editTodoInDB } from '../../services/todo-service';

interface IProps {
    isOpen: boolean
    closeModal: (_reload: boolean) => void
    contextPath: string
    todo: ITodo | undefined
}

interface IFormData {
  id: number
  name: string
  description: string
  complete: string
}

export default function AddTodoModal(props : IProps) {
  const {
    isOpen, closeModal, contextPath, todo,
  } = props;

  const onSubmit = async (data : IFormData) => {
    const newTodo = {
      id: todo ? todo.id : -1,
      name: data.name,
      description: data.description,
      complete: data.complete === 'true',
    };
    if (todo.id === undefined) {
      await addTodoToDB(newTodo, contextPath);
    } else {
      await editTodoInDB(newTodo, contextPath);
    }
    closeModal(true);
  };

  return (
    <ModalTransition>
      {isOpen && (
      <Modal onClose={() => closeModal(false)}>
        <Form<IFormData> onSubmit={onSubmit}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
              <ModalHeader>
                <ModalTitle>Create a user</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <IdField value={todo?.id} />
                <NameField value={todo?.name} />
                <DescriptionField value={todo?.description} />
                <CompleteField value={todo ? todo.complete : false} />
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={() => closeModal(false)}>
                  Close
                </Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  {todo ? 'Edit' : 'Create'}
                </LoadingButton>
              </ModalFooter>
            </form>
          )}
        </Form>
      </Modal>
      )}
    </ModalTransition>
  );
}
