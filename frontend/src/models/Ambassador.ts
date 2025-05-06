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
}
