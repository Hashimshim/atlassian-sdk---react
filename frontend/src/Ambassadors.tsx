import React, { useState } from 'react';
import CreateAmbassadorModal from './CreateAmbassadorModal';
import Button from '@atlaskit/button'
interface AmbassadorsProps {
  contextPath: string;
}

const Ambassadors: React.FC<AmbassadorsProps> = ({ contextPath }) => {
  const restBase     = 'rest/app/1.0';
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New Ambassador</Button>
      <CreateAmbassadorModal
        isOpen={open}
        onClose={() => setOpen(false)}
        contextPath={contextPath}
        restBase={restBase}
      />
    </div>
  );
};

export default Ambassadors;