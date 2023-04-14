package ru.matveev.alexey.atlas.jira.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.atlassian.sal.api.transaction.TransactionCallback;
import ru.matveev.alexey.atlas.jira.ao.Todo;
import ru.matveev.alexey.atlas.jira.ao.TodoService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    public Response getTodo()
    {
       return Response.ok(new AoRestResourceModel( todoService.all().toString())).build();
    }

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public Response createTodo()
    {

        todoService.add("new item");
        return Response.ok(new AoRestResourceModel( "added")).build();
    }
}