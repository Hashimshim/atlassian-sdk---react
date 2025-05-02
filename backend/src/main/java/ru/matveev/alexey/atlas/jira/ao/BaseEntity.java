package ru.matveev.alexey.atlas.jira.ao;

import net.java.ao.Entity;

public interface BaseEntity extends Entity {
    /**
     * A JSON string storing arbitrary future attributes.
     * AO will create a PROPERTIES column of type VARCHAR/TEXT.
     */
    String getProperties();
    void setProperties(String properties);
}
