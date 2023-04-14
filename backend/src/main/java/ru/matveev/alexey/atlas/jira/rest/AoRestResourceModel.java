package ru.matveev.alexey.atlas.jira.rest;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class AoRestResourceModel {

    @XmlElement(name = "value")
    private String message;

    public AoRestResourceModel() {
    }

    public AoRestResourceModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}