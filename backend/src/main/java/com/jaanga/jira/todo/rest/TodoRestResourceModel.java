package com.jaanga.jira.todo.rest;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TodoRestResourceModel {

    @XmlElement(name = "id")
    private Integer id;

    @XmlElement(name = "name")
    private String name;

    @XmlElement(name = "description")
    private String description;

    @XmlElement(name = "complete")
    private boolean complete;

    public TodoRestResourceModel() {
    }

    public TodoRestResourceModel(Integer id, String name, String description, boolean complete) {
        this.id = id;
        this.name = name;
        this. description = description;
        this.complete = complete;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId (Integer id) {
        this.id = id;
    }

}
