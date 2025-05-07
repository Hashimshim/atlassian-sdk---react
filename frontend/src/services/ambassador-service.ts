import { IAmbassador, IField, IContext, IUser } from '../models/Ambassador';

const BASE = (contextPath: string) => `${contextPath}/rest/app/1.0/ambassador`;

// Fetch all custom fields from Jira
export const getAllCustomFields = async (contextPath: string): Promise<IField[]> =>
  (await fetch(`${contextPath}/rest/api/2/field`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

// Fetch contexts for a custom field using app-specific endpoint
export const getCustomFieldContexts = async (
  fieldId: string,
  contextPath: string
): Promise<IContext[]> => {
  const res = await fetch(
    `${contextPath}/rest/app/1.0/customfields/${fieldId}/contexts`,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }
  );
  if (!res.ok) return [];
  return res.json();
};

// Fetch user info (displayName + avatar)
export const getUserInfo = async (
  accountId: string,
  contextPath: string
): Promise<IUser> => {
  const res = await fetch(
    `${contextPath}/rest/api/2/user?key=${encodeURIComponent(
      accountId
    )}`,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }
  );
  if (!res.ok) {
    return { displayName: accountId, avatarUrl: '' };
  }
  const body = await res.json();
  return {
    displayName: body.displayName,
    avatarUrl: body.avatarUrls?.['48x48'] || '',
  };
};

// Get all ambassadors enriched with field, context, and user info
export const getAllAmbassadors = async (
  contextPath: string
): Promise<IAmbassador[]> => {
  // 1) Fetch raw ambassadors
  const rawAmbs: IAmbassador[] = await fetch(
    `${contextPath}/rest/app/1.0/ambassador`,
    {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }
  ).then((r) => r.json());

  // 2) Fetch and filter custom fields
  const allFields = await getAllCustomFields(contextPath);
  const customFields = allFields.filter((f) => f.custom);

  // 3) Unique customFieldIds
  const uniqueFieldIds = Array.from(
    new Set(rawAmbs.map((a) => a.customFieldId))
  );

  // 4) Fetch contexts per field
  const contextsMapping: Record<string, IContext[]> = {};
  await Promise.all(
    uniqueFieldIds.map(async (fieldId) => {
      contextsMapping[fieldId] = await getCustomFieldContexts(
        fieldId,
        contextPath
      );
    })
  );

  // 5) Flatten contexts for lookup
  const allContexts = Object.values(contextsMapping).flat();

  // 6) Enrich each ambassador
  return Promise.all(
    rawAmbs.map(async (a) => {
      const fieldDef = customFields.find((f) => f.id === a.customFieldId);
      const ctxDef = allContexts.find(
        (c) => c.schemeId.toString() === a.contextId || c.configs.some(cfg => cfg.configId.toString() === a.contextId)
      );
      // fetch user info
      const user = await getUserInfo(a.accountId, contextPath);

      return {
        ...a,
        customFieldName: fieldDef?.name || a.customFieldId,
        contextName: ctxDef?.name || a.contextId,
        contextDescription: ctxDef?.description || '',
        userDisplayName: user.displayName,
        userAvatarUrl: user.avatarUrl,
      };
    })
  );
};

export const getAmbassadorById = async (
  id: string,
  contextPath: string
): Promise<IAmbassador> =>
  (await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

export const addAmbassador = async (
  amb: IAmbassador,
  contextPath: string
): Promise<IAmbassador> =>
  (await fetch(BASE(contextPath), {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(amb),
  })).json();

export const editAmbassador = async (
  amb: IAmbassador,
  contextPath: string
): Promise<IAmbassador> =>
  (await fetch(BASE(contextPath), {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(amb),
  })).json();

export const deleteAmbassador = async (
  id: string,
  contextPath: string
): Promise<Object> =>
  await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  });
