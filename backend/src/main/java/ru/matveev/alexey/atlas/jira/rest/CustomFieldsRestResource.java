package ru.matveev.alexey.atlas.jira.rest;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.customfields.manager.OptionsManager;
import com.atlassian.jira.issue.customfields.option.Option;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Named
@Path("/customfields")
public class CustomFieldsRestResource {
    private final CustomFieldManager customFieldManager;
    private final OptionsManager optionsManager;

    @Inject
    public CustomFieldsRestResource(
            @ComponentImport CustomFieldManager customFieldManager,
            @ComponentImport OptionsManager optionsManager) {
        this.customFieldManager = customFieldManager;
        this.optionsManager = optionsManager;
    }

    /**
     * GET /rest/.../customfields/all
     * Returns every custom field with id, name, typeKey, and description.
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomFields() {
        List<CustomField> allFields = customFieldManager.getCustomFieldObjects();

        List<Map<String, Object>> result = allFields.stream()
                .map(cf -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", cf.getId());
                    m.put("name", cf.getName());
                    m.put("typeKey", cf.getCustomFieldType().getDescriptor().getKey());
                    m.put("description", cf.getDescription());
                    return m;
                })
                .collect(Collectors.toList());

        return Response.ok(result).build();
    }

    /**
     * GET /rest/.../customfields/options
     * Returns only the "option-type" custom fields (descriptor ends with ":select").
     */
    @GET
    @Path("/options")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOptionCustomFields() {
        List<CustomField> all = customFieldManager.getCustomFieldObjects();

        List<Map<String, Object>> optionFields = all.stream()
                .filter(cf -> {
                    String key = cf.getCustomFieldType().getDescriptor().getKey();
                    return key != null && key.endsWith("select");
                })
                .map(cf -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", cf.getId());
                    m.put("name", cf.getName());
                    return m;
                })
                .collect(Collectors.toList());

        return Response.ok(optionFields).build();
    }

    /**
     * GET /rest/.../customfields/{fieldId}/values
     * Returns all option values for the given select-type custom field.
     */
    @GET
    @Path("/{fieldId}/values")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomFieldValues(@PathParam("fieldId") String fieldId) {
        CustomField cf = customFieldManager.getCustomFieldObject(fieldId);
        if (cf == null) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "CustomField not found");
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(err)
                    .build();
        }

        FieldConfig config = cf.getRelevantConfig(null);
        if (config == null) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "No configuration for field");
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(err)
                    .build();
        }

        List<Map<String, Object>> values = optionsManager
                .getOptions(config)
                .getRootOptions()
                .stream()
                .map(opt -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", opt.getOptionId());
                    m.put("value", opt.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        return Response.ok(values).build();
    }
}
