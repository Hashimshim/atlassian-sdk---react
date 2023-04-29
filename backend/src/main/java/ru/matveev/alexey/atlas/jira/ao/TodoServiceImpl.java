package ru.matveev.alexey.atlas.jira.ao;

import com.atlassian.activeobjects.external.ActiveObjects;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.collect.Lists.newArrayList;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.google.common.util.concurrent.UncheckedExecutionException;

import javax.inject.Inject;
import javax.inject.Named;

@Named
public class TodoServiceImpl implements TodoService
{
    @ComponentImport
    private final ActiveObjects ao;

    @Inject
    public TodoServiceImpl(ActiveObjects ao)
    {
        this.ao = checkNotNull(ao);
    }

    @Override
    public Todo add(String name, String description, boolean comlete)
    {
        final Todo todo = ao.create(Todo.class);
        todo.setName(name);
        todo.setDescription(description);
        todo.setComplete(comlete);
        todo.save();
        return todo;
    }

    @Override
    public List<Todo> all() {
        try {
            return newArrayList(ao.find(Todo.class));
        } catch (UncheckedExecutionException e) {
            return new ArrayList<>();
        }
    }
}
