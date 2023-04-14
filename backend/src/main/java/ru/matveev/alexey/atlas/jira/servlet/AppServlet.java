package ru.matveev.alexey.atlas.jira.servlet;

import com.atlassian.jira.util.json.JSONException;
import com.atlassian.jira.util.json.JSONObject;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.soy.renderer.SoyTemplateRenderer;
import electric.server.http.HTTP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.matveev.alexey.atlas.jira.service.ResourceService;

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

    public AppServlet(@ComponentImport  SoyTemplateRenderer soyTemplateRenderer, ResourceService resourceService) {
        this.resourceService = resourceService;
        this.soyTemplateRenderer = soyTemplateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        String pluginKey = this.resourceService.getProperty("atlassian.plugin.key");
        Map<String, Object> map = new HashMap<>();
        map.put("contextPath", req.getContextPath());

        String html = soyTemplateRenderer.render(pluginKey + ":jira-react-atlaskit-resources", "servlet.ui.app", map);

        resp.setContentType("text/html");
        resp.getWriter().write(html);
        resp.getWriter().close();    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StringBuffer jb = new StringBuffer();
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) { /*report an error*/ }
        log.info(String.format("Post Data: %s", jb.toString()));

        String pluginKey = this.resourceService.getProperty("atlassian.plugin.key");
        Map<String, Object> map = new HashMap<>();
        map.put("contextPath", req.getContextPath());

        String html = soyTemplateRenderer.render(pluginKey + ":jira-react-atlaskit-resources", "servlet.ui.app", map);

        resp.setContentType("text/html");
        resp.getWriter().write(html);
        resp.getWriter().close();
    }


}