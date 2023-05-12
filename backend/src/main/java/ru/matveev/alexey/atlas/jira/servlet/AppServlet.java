package ru.matveev.alexey.atlas.jira.servlet;

import com.atlassian.jira.util.json.JSONException;
import com.atlassian.jira.util.json.JSONObject;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.soy.renderer.SoyTemplateRenderer;
import electric.server.http.HTTP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.matveev.alexey.atlas.jira.service.ResourceService;
import com.atlassian.templaterenderer.TemplateRenderer;
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class AppServlet extends HttpServlet{
    private static final Logger log = LoggerFactory.getLogger(AppServlet.class);
    private final ResourceService resourceService;
    private final SoyTemplateRenderer soyTemplateRenderer;
    private final TemplateRenderer templateRenderer;

    public AppServlet(@ComponentImport  SoyTemplateRenderer soyTemplateRenderer, @ComponentImport TemplateRenderer templateRenderer,  ResourceService resourceService) {
        this.resourceService = resourceService;
        this.soyTemplateRenderer = soyTemplateRenderer;
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, Object> map = new HashMap<>();
        map.put("contextPath", req.getContextPath());
        resp.setContentType("text/html;charset=UTF-8");
        templateRenderer.render("/templates/servlets.vm", map, resp.getWriter());
    }
}