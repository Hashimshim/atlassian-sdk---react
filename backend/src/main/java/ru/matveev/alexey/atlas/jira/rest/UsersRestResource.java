package ru.matveev.alexey.atlas.jira.rest;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.jira.user.util.UserManager;
import com.atlassian.jira.user.ApplicationUser;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

// ← Missing imports added here:
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Named
@Path("/users")
public class UsersRestResource {
    private final UserManager userManager;

    @Inject
    public UsersRestResource(@ComponentImport UserManager userManager) {
        this.userManager = userManager;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        // build a List<Map<String,String>> of users
        Object users = userManager
                .getAllApplicationUsers();

        return Response.ok(users).build();
    }
}