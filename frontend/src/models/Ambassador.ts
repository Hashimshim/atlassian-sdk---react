// src/models/Ambassador.ts

/**
 * Represents the Ambassador AO entity from Java:
 * - getID()           → id: number
 * - getAccountId()    → accountId: string
 * - getCustomFieldId()→ customFieldId: string
 * - getContextId()    → contextId: string
 * - getCreatedAt()    → createdAt: string (ISO timestamp)
 */
export interface IAmbassador {
  id: number;
  accountId: string;
  customFieldId: string;
  contextId: string;
  createdAt: string;
  // enriched properties
  customFieldName?: string;
  contextName?: string;
  contextDescription?: string;
  userDisplayName?: string;
  userAvatarUrl?: string;
}


/**
 * Represents a Jira custom field definition
 */
export interface IField {
  id: string;       // e.g. "customfield_10100"
  name: string;     // human-readable field name
  custom: boolean;  // true if custom field
}

/**
 * Represents a single context for a custom field
 */
export interface IContext {
  schemeId: number; // context identifier (schemeId)
  name: string;     // context name
  description: string;
  configs: Array<{
    configId: number;    // individual config ID
    defaultValue: any[]; // default values
    name: string;
    description: string;
  }>;
  associatedIssueTypeIds: Array<string | null>;
  associatedProjectIds: number[];
  isGlobal: boolean;
  isAllProjects: boolean;
}

/**
 * Represents a Jira user’s minimal info
 */
export interface IUser {
  /** The user’s full display name in Jira */
  displayName: string;
  /** URL to the user’s avatar image (48×48 by default) */
  avatarUrl: string;
}
