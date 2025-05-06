/**
 * Represents the Log AO entity from Java:
 * - getID()         → id: number
 * - getActionType() → actionType: string
 * - getLogDetails() → logDetails: string
 * - getActorId()    → actorId: string
 * - getLoggedAt()   → loggedAt: string (ISO timestamp)
 */
export interface ILog {
  id: number;
  actionType: string;
  logDetails: string;
  actorId: string;
  loggedAt: string;
}
