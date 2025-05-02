package ru.matveev.alexey.atlas.jira.ao.log;

import ru.matveev.alexey.atlas.jira.ao.BaseEntity;
import net.java.ao.Entity;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface Log extends BaseEntity {
    @AutoIncrement
    @PrimaryKey("ID")
    public int getID();

    /** the action type performed */
    String getActionType();
    void setActionType(String actionType);

    /** JSON or stringified details of the action */
    String getLogDetails();
    void setLogDetails(String logDetails);

    /** identifier of the actor who performed the action */
    String getActorId();
    void setActorId(String actorId);

    /** ISO timestamp when the action occurred */
    String getLoggedAt();
    void setLoggedAt(String loggedAt);
}
