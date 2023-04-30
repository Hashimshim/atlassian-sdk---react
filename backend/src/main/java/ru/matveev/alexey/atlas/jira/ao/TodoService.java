package ru.matveev.alexey.atlas.jira.ao;

import com.atlassian.activeobjects.tx.Transactional;

import java.util.List;

@Transactional
public interface TodoService
{
    Todo add(String name, String description, boolean comlete);

    Todo edit(int id, String name, String description, boolean comlete);
    boolean delete (int id);
    List<Todo> all();

    List<Todo> notLikeFilter();
}
