// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';

interface IProps {
    contextPath : string
  }

interface IssueType {
  avatarId: number
 description: string
iconUrl:string
id:string
name: string
self:string
subtask:boolean
}

export default function IssueTypes(props : IProps) {
  const { contextPath } = props;

  const [itemTypes, setItemTypes] = useState<IssueType[]>([]);
  useEffect(() => {
    (async () => {
      const data = await (
        await fetch(`${contextPath}/rest/api/2/issuetype`)
      ).json() as IssueType [];
      setItemTypes(data);
    })();
  }, [1]);
  return (
    <div>
      Issue Types
      {JSON.stringify(itemTypes)}
    </div>
  );
}
