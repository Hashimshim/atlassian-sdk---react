package ru.matveev.alexey.atlas.jira.ao.ambassador;

import net.java.ao.Entity;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface Ambassador extends Entity {

    @AutoIncrement
    @NotNull
    @PrimaryKey("ID")
    public int getID();

    String getAccountId();

    void setAccountId(String accountId);

    String getCustomFieldId();

    void setCustomFieldId(String customFieldId);

    String getContextId();

    void setContextId(String contextId);

    String getCreatedAt();

    void setCreatedAt(String createdAt);
}
