package ru.matveev.alexey.atlas.jira.rest.ambassador;

import ru.matveev.alexey.atlas.jira.ao.ambassador.AmbassadorService;
import ru.matveev.alexey.atlas.jira.ao.ambassador.Ambassador;


import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Named
@Path("/ambassador")
public class AmbassadorRestResource {
    private final AmbassadorService ambassadorService;

    @Inject
    public AmbassadorRestResource(AmbassadorService ambassadorService) {
        this.ambassadorService = checkNotNull(ambassadorService);
    }

    /**
     * GET /ambassador
     * Returns all Ambassador records.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List<AmbassadorRestResourceModel> list = ambassadorService.all().stream()
                .map(a -> new AmbassadorRestResourceModel(
                        a.getID(),
                        a.getAccountId(),
                        a.getCustomFieldId(),
                        a.getContextId(),
                        a.getCreatedAt()
                ))
                .collect(Collectors.toList());
        return Response.ok(list).build();
    }

    /**
     * POST /ambassador
     * Creates a new Ambassador.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(AmbassadorRestResourceModel model) {
        ambassadorService.add(
                model.getAccountId(),
                model.getCustomFieldId(),
                model.getContextId(),
                model.getCreatedAt()
        );
        return Response.ok(new AmbassadorRestResourceModel("added")).build();
    }

    /**
     * PUT /ambassador
     * Updates an existing Ambassador.
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(AmbassadorRestResourceModel model) {
        ambassadorService.edit(
                model.getId(),
                model.getAccountId(),
                model.getCustomFieldId(),
                model.getContextId(),
                model.getCreatedAt()
        );
        return Response.ok(new AmbassadorRestResourceModel("edited")).build();
    }

    /**
     * DELETE /ambassador/{id}
     * Deletes the Ambassador with the given ID.
     */
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") int id) {
        boolean removed = ambassadorService.delete(id);
        String msg = removed ? "deleted" : "not found";
        return Response.ok(new AmbassadorRestResourceModel(msg)).build();
    }

    /**
     * (Optional) GET /ambassador/context/{contextId}
     * Returns ambassadors filtered by contextId.
     */
    @GET
    @Path("/context/{contextId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getByContext(@PathParam("contextId") String contextId) {
        List<AmbassadorRestResourceModel> list = ambassadorService.findByContext(contextId).stream()
                .map(a -> new AmbassadorRestResourceModel(
                        a.getID(),
                        a.getAccountId(),
                        a.getCustomFieldId(),
                        a.getContextId(),
                        a.getCreatedAt()
                ))
                .collect(Collectors.toList());
        return Response.ok(list).build();
    }

    /**
     * GET /ambassador/account/{accountId}
     * Retourne tous les Ambassador pour ce accountId.
     */
    @GET
    @Path("/{accountId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getByAccountId(@PathParam("accountId") String accountId) {
        List<AmbassadorRestResourceModel> list = ambassadorService
                .findByAmbassadorById(accountId)
                .stream()
                .map(a -> new AmbassadorRestResourceModel(
                        a.getID(),
                        a.getAccountId(),
                        a.getCustomFieldId(),
                        a.getContextId(),
                        a.getCreatedAt()
                ))
                .collect(Collectors.toList());

        if (list.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new AmbassadorRestResourceModel("not found"))
                    .build();
        }

        return Response.ok(list).build();
    }

}
