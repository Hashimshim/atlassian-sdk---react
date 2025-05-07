
// src/Main.tsx
import React, { useEffect, useState } from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { getAmbassadorsByUser } from './services/ambassador-service';
import { IAmbassador } from './models/Ambassador';

interface MainProps { contextPath: string; }

const Main: React.FC<MainProps> = ({ contextPath }) => {
  const [ambassadors, setAmbassadors] = useState<IAmbassador[]>([]);
  const [loading, setLoading] = useState(false);
  const [userKey, setUserKey] = useState<string | null>(null);

  // Fetch current user key
  useEffect(() => {
    fetch(`${contextPath}/rest/api/2/myself`, { credentials: 'include', headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(data => setUserKey(data.key))
  }, [contextPath]);

  // Once we have the key, load ambassadors
  useEffect(() => {
    if (!userKey) return;
    setLoading(true);
    getAmbassadorsByUser(userKey, contextPath)
      .then(list => console.log("list", list));
  }, [userKey, contextPath]);

  return (
    <div>
      <h1>Ambassadors</h1>
    </div>
  );
};

export default Main;
