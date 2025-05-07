import React, { useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import CreateAmbassadorModal from './CreateAmbassadorModal';
import { getAllAmbassadors, deleteAmbassador } from './services/ambassador-service';
import { IAmbassador } from './models/Ambassador';

interface AmbassadorsProps {
  contextPath: string;
}

const Ambassadors: React.FC<AmbassadorsProps> = ({ contextPath }) => {
  const restBase = 'rest/app/1.0';
  const [openModal, setOpenModal] = useState(false);
  const [selectedAmbassador, setSelectedAmbassador] = useState<IAmbassador | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ambassadors, setAmbassadors] = useState<IAmbassador[]>([]);

  const reload = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAmbassadors(contextPath);
      setAmbassadors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, [contextPath]);


  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await deleteAmbassador(id.toString(), contextPath);
    await reload();
  };

  const head = {
    cells: [
      { key: 'avatar', content: '' },
      { key: 'displayName', content: 'User', isSortable: true },
      { key: 'customFieldName', content: 'Field', isSortable: true },
      { key: 'contextName', content: 'Context', isSortable: true },
      { key: 'createdAt', content: 'Created At', isSortable: true },
      { key: 'actions', content: 'Actions' },
    ],
  };

  const rows = ambassadors.map((a) => ({
    key: a.id.toString(),
    cells: [
      {
        key: `${a.id}-avatar`,
        content: (
          <img
            src={a.userAvatarUrl || '/images/default-avatar.png'}
            alt={a.userDisplayName}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
        ),
      },
      { key: `${a.id}-name`, content: a.userDisplayName || '' },
      { key: `${a.id}-field`, content: a.customFieldName || '' },
      { key: `${a.id}-context`, content: a.contextName || '' },
      { key: `${a.id}-created`, content: new Date(a.createdAt).toLocaleString() },
      {
        key: `${a.id}-actions`,
        content: (
           <Button appearance="link" onClick={() => handleDelete(a.id)}>
           Revoke
           </Button>
        ),
      },
    ],
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Ambassadors</h2>
        <Button
          appearance="primary"
          onClick={() => {
            setSelectedAmbassador(null);
            setOpenModal(true);
          }}
        >
          New Ambassador
        </Button>
      </div>

      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={10}
        defaultPage={1}
        isLoading={isLoading}
        isRankable
      />

      <CreateAmbassadorModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          reload();
        }}
        contextPath={contextPath}
        restBase={restBase}
      />
    </div>
  );
};

export default Ambassadors;
