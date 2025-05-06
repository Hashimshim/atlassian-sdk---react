// src/main/java/ru/matveev/alexey/atlas/jira/rest/ambassador/AmbassadorRestResourceModel.java
package ru.matveev.alexey.atlas.jira.rest.ambassador;

public class AmbassadorRestResourceModel {
    private int id;
    private String accountId;
    private String customFieldId;
    private String contextId;
    private String createdAt;

    // For GET mapping
    public AmbassadorRestResourceModel(int id, String accountId, String customFieldId, String contextId, String createdAt) {
        this.id = id;
        this.accountId = accountId;
        this.customFieldId = customFieldId;
        this.contextId = contextId;
        this.createdAt = createdAt;
    }
    public AmbassadorRestResourceModel() {
        // Jackson needs this
    }

    // For POST/PUT/DELETE responses (message only)
    private String message;
    public AmbassadorRestResourceModel(String message) {
        this.message = message;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getCustomFieldId() {
        return customFieldId;
    }
    public void setCustomFieldId(String customFieldId) {
        this.customFieldId = customFieldId;
    }

    public String getContextId() {
        return contextId;
    }
    public void setContextId(String contextId) {
        this.contextId = contextId;
    }

    public String getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
