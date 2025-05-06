package ru.matveev.alexey.atlas.jira.rest;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.jira.issue.CustomFieldManager;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.config.FieldConfig;
import com.atlassian.jira.issue.fields.config.FieldConfigScheme;
import com.atlassian.jira.issue.customfields.CustomFieldType;


import com.atlassian.jira.issue.customfields.manager.OptionsManager;
import com.atlassian.jira.issue.customfields.option.Options;
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
    @Path("/filtered")
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
     * GET /rest/.../customfields/{fieldId}/contexts
     * Returns all configuration schemes (contexts) for a given custom field,
     * including each scheme’s configs (id, name, description, defaultValue).
     */
    @GET
    @Path("/{fieldId}/contexts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomFieldContexts(@PathParam("fieldId") String fieldId) {
        // 1. Lookup the custom field by ID
        CustomField cf = customFieldManager.getCustomFieldObject(fieldId);
        if (cf == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Custom field not found: " + fieldId)
                    .build();
        }

        // 2. Retrieve all configuration schemes (contexts)
        List<FieldConfigScheme> schemes = cf.getConfigurationSchemes();  // :contentReference[oaicite:0]{index=0}

        // 3. Build the response
        List<Map<String, Object>> result = schemes.stream().map(scheme -> {
            Map<String, Object> schemeMap = new HashMap<>();
            schemeMap.put("schemeId", scheme.getId());
            schemeMap.put("name", scheme.getName());
            schemeMap.put("description", scheme.getDescription());
            schemeMap.put("isGlobal", scheme.isGlobal());
            schemeMap.put("isAllProjects", scheme.isAllProjects());
            schemeMap.put("associatedProjectIds", scheme.getAssociatedProjectIds());
            schemeMap.put("associatedIssueTypeIds", scheme.getAssociatedIssueTypeIds());

            // 4. For each scheme, include its individual FieldConfig entries
            List<Map<String, Object>> configs = scheme.getConfigs()
                    .values()                         // Collection<FieldConfig>
                    .stream()
                    .map(config -> {
                        Map<String, Object> cfgMap = new HashMap<>();
                        // Basic config metadata:
                        cfgMap.put("configId",     config.getId());
                        cfgMap.put("name",         config.getName());
                        cfgMap.put("description",  config.getDescription());

                        // Fetch default via the CustomFieldType API:
                        CustomFieldType<?,?> type = (CustomFieldType<?,?>) cf.getCustomFieldType();
                        Object defaultVal = type.getDefaultValue(config);
                        cfgMap.put("defaultValue", defaultVal);

                        return cfgMap;
                    })
                    .collect(Collectors.<Map<String,Object>>toList());


            schemeMap.put("configs", configs);
            return schemeMap;
        }).collect(Collectors.toList());

        // 5. Return JSON
        return Response.ok(result).build();
    }

    /**
     * GET /rest/.../customfields/{fieldId}/contexts/{contextId}/options
     * Returns every select-type option for that field in the given context.
     */
    @GET
    @Path("/{fieldId}/contexts/{contextId}/options")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomFieldContextOptions(
            @PathParam("fieldId") String fieldId,
            @PathParam("contextId") Long   contextId) {

        // 1. Load field
        CustomField cf = customFieldManager.getCustomFieldObject(fieldId);
        if (cf == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Field not found: " + fieldId)
                    .build();
        }

        // 2. Find the matching context (FieldConfigScheme)
        FieldConfigScheme matchingScheme = cf.getConfigurationSchemes().stream()
                .filter(scheme -> scheme.getId().equals(contextId))
                .findFirst()
                .orElse(null);

        if (matchingScheme == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Context not found: " + contextId)
                    .build();
        }

        // 3. For each FieldConfig in that scheme, fetch its Options
        List<Map<String,Object>> contextOptions = matchingScheme.getConfigs()
                .values()                                         // Collection<FieldConfig>
                .stream()
                .flatMap(fieldConfig -> {
                    Options opts = optionsManager.getOptions(fieldConfig);
                    // OptionsManager.getOptions(FieldConfig) returns all select-type options :contentReference[oaicite:0]{index=0}
                    return opts.getRootOptions().stream();
                })
                .map(opt -> {
                    Map<String,Object> o = new HashMap<>();
                    o.put("optionId",    opt.getOptionId());
                    o.put("value",       opt.getValue());
                    o.put("parentId",    opt.getParentOption() != null
                            ? opt.getParentOption().getOptionId()
                            : null);
                    o.put("sequence",    opt.getSequence());
                    return o;
                })
                .collect(Collectors.toList());

        // 4. Return as JSON
        return Response.ok(contextOptions).build();
    }

}
