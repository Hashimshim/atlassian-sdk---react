import React, { useState, useEffect } from 'react';
// 1) Modal subcomponents instead of `Modal` with heading:
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from '@atlaskit/modal-dialog';
// 2) Give Select a generic so TS knows its option shape:
import Select, { ValueType } from '@atlaskit/select';
import Button from '@atlaskit/button';

type User        = { id: string; displayName: string };
type CustomField = { id: string; name: string };
type Context     = { schemeId: number; name: string };
type Option      = { value: string | number; label: string };

interface CreateAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextPath: string;      // e.g. "/jira"
  restBase: string;         // e.g. "rest/app/1.0"
}

const CreateAmbassadorModal: React.FC<CreateAmbassadorModalProps> = ({
  isOpen,
  onClose,
  contextPath,
  restBase,
}) => {
  const [users, setUsers]             = useState<User[]>([]);
  const [fields, setFields]           = useState<CustomField[]>([]);
  const [contexts, setContexts]       = useState<Context[]>([]);

  // Updated state to store full Option objects
  const [selectedUser, setSelectedUser]       = useState<Option | null>(null);
  const [selectedField, setSelectedField]     = useState<Option | null>(null);
  const [selectedContext, setSelectedContext] = useState<Option | null>(null);

  const [loadingContexts, setLoadingContexts] = useState(false);
  const [submitting, setSubmitting]           = useState(false);

  // Fetch users + fields when modal opens
  useEffect(() => {
    if (!isOpen) return;

    Promise.all([
      fetch(`${contextPath}/${restBase}/users`, { credentials: 'same-origin' })
        .then(r => r.json() as Promise<User[]>)
        .then(setUsers),
      fetch(`${contextPath}/${restBase}/customfields/all`, { credentials: 'same-origin' })
        .then(r => r.json() as Promise<CustomField[]>)
        .then(setFields),
    ]).catch(console.error);

    console.log("users", users)

    // reset controls
    setSelectedUser(null);
    setSelectedField(null);
    setContexts([]);
    setSelectedContext(null);
  }, [isOpen, contextPath, restBase]);

  // Fetch contexts when a custom field is chosen
  useEffect(() => {
    if (!selectedField) return;

    setLoadingContexts(true);
    fetch(
      `${contextPath}/${restBase}/customfields/${selectedField.value}/contexts`,
      { credentials: 'same-origin' }
    )
      .then(r => r.json() as Promise<Context[]>)
      .then(data => {
        setContexts(data);
        setSelectedContext(null);
      })
      .catch(console.error)
      .finally(() => setLoadingContexts(false));
  }, [selectedField, contextPath, restBase]);

  const handleCreateAmbassador = () => {
    if (!selectedUser || !selectedField || !selectedContext) return;

    setSubmitting(true);

    const payload = {
      accountId:    selectedUser.value as string,
      customFieldId:selectedField.value as string,
      contextId:    String(selectedContext.value),
      createdAt:    new Date().toISOString(),
    };

    console.log("payload", payload, "selected user", selectedUser)

    fetch(`${contextPath}/${restBase}/ambassador`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`Failed to create ambassador (${r.status})`);
        }
        return r.json();
      })
      .then(() => {
        onClose();
      })
      .catch(err => {
        console.error(err);
        alert('Error creating ambassador: ' + err.message);
      })
      .finally(() => setSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} width="medium">
      <ModalHeader>
        <ModalTitle>Create Ambassador</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="user-select"><strong>User</strong></label>
          <Select<Option, false>
            inputId="user-select"
            options={users.map(u => ({ value: u.id, label: u.displayName }))}
            placeholder="Select a user…"
            onChange={(opt: Option | null) => setSelectedUser(opt)}
            value={selectedUser}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="field-select"><strong>Custom Field</strong></label>
          <Select<Option, false>
            inputId="field-select"
            options={fields.map(f => ({ value: f.id, label: f.name }))}
            placeholder="Select a custom field…"
            onChange={(opt: Option | null) => setSelectedField(opt)}
            value={selectedField}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="context-select"><strong>Context</strong></label>
          <Select<Option, false>
            inputId="context-select"
            options={contexts.map(c => ({ value: c.schemeId, label: c.name }))}
            placeholder={loadingContexts ? 'Loading contexts…' : 'Select a context…'}
            onChange={(opt: Option | null) => setSelectedContext(opt)}
            value={selectedContext}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} isDisabled={submitting}>
          Cancel
        </Button>
        <Button
          appearance="primary"
          onClick={handleCreateAmbassador}
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateAmbassadorModal;