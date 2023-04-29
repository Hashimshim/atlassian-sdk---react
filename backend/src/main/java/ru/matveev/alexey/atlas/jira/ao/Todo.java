package ru.matveev.alexey.atlas.jira.ao;

import net.java.ao.Entity;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

public interface Todo extends Entity
{
    @AutoIncrement
    @NotNull
    @PrimaryKey("id")
    String getId();

    String getName();

    void setName(String name);

    String getDescription();

    void setDescription(String description);

    boolean isComplete();

    void setComplete(boolean complete);

}
