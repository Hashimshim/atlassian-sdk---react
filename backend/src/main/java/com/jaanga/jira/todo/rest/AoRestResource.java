package com.jaanga.jira.todo.rest;

import com.jaanga.jira.todo.ao.TodoService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * A resource of message.
 */
@Named
@Path("/todo")
public class AoRestResource {
    private final TodoService todoService;

    @Inject
    public AoRestResource(TodoService todoService)
    {
        this.todoService = checkNotNull(todoService);
    }
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getTodos()
    {
        //List<Todo> filtered = todoService.notLikeFilter();
        List<TodoRestResourceModel> todos = todoService.all().stream().map(todo ->
             new TodoRestResourceModel(todo.getID(),todo.getName(), todo.getDescription(), todo.isComplete())
        ).collect(Collectors.toList());
       return Response.ok(todos).build();
    }

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public Response createTodo(TodoRestResourceModel todo)
    {
        todoService.add(todo.getName(), todo.getDescription(), todo.isComplete());
        return Response.ok(new AoRestResourceModel( "added")).build();
    }

    @PUT
    @Produces({MediaType.APPLICATION_JSON})
    public Response editTodo(TodoRestResourceModel todo)
    {
        todoService.edit(todo.getId(),todo.getName(), todo.getDescription(), todo.isComplete());
        return Response.ok(new AoRestResourceModel( "edited")).build();
    }

    @DELETE
    @Produces({MediaType.APPLICATION_JSON})
    @Path("{id}")
    public Response deleteTodo(@PathParam("id") int id)
    {
        todoService.delete(id);
        return Response.ok(new AoRestResourceModel( "deleted")).build();
    }
}
