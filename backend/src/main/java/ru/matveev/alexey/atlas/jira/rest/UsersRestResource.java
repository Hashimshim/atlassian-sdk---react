package ru.matveev.alexey.atlas.jira.rest;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.jira.user.util.UserManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.jira.timezone.TimeZoneManager;

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

import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@Named
@Path("/users")
public class UsersRestResource {
    private final UserManager userManager;
    private final TimeZoneManager timeZoneManager;

    @Inject
    public UsersRestResource(
            @ComponentImport UserManager userManager,
            @ComponentImport TimeZoneManager timeZoneManager) {
        this.userManager = userManager;
        this.timeZoneManager = timeZoneManager;
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        // build a List<Map<String,String>> of users
        Object users = userManager
                .getAllApplicationUsers();

        return Response.ok(users).build();
    }

    /**
     * GET /rest/.../users/{accountId}
     * Fetch a single user's details by their unique accountId (user key),
     * including their personal timezone.
     */
    @GET
    @Path("/{accountId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByAccountId(@PathParam("accountId") String accountId) {
        // 1. Lookup by accountId
        ApplicationUser user = userManager.getUserByKey(accountId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("User not found: " + accountId)
                    .build();
        }

        // 2. Build JSON map of user details
        Map<String, Object> result = new HashMap<>();
        result.put("accountId",    user.getKey());
        result.put("displayName",  user.getDisplayName());
        result.put("emailAddress", user.getEmailAddress());
        result.put("active",       user.isActive());

        // 3. Fetch timezone via TimeZoneManager
        //    Returns a java.util.TimeZone for the given ApplicationUser :contentReference[oaicite:1]{index=1}
        TimeZone tz = timeZoneManager.getTimeZoneforUser(user);
        result.put("timeZone",     tz == null ? null : tz.getID());

        // 4. Return as JSON
        return Response.ok(result).build();
    }

}