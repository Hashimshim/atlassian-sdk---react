package ru.matveev.alexey.atlas.jira.ao.log;

import com.atlassian.activeobjects.external.ActiveObjects;
import net.java.ao.Query;
import com.google.common.util.concurrent.UncheckedExecutionException;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.collect.Lists.newArrayList;

@Named
public class LogServiceImpl implements LogService
{
    private final ActiveObjects ao;

    @Inject
    public LogServiceImpl(ActiveObjects ao)
    {
        this.ao = checkNotNull(ao);
    }

    @Override
    public Log add(String actionType,
                   String logDetails,
                   String actorId,
                   String loggedAt)
    {
        Log log = ao.create(Log.class);
        log.setActionType(actionType);
        log.setLogDetails(logDetails);
        log.setActorId(actorId);
        log.setLoggedAt(loggedAt);
        log.save();
        return log;
    }

    @Override
    public Log edit(int id,
                    String actionType,
                    String logDetails,
                    String actorId,
                    String loggedAt)
    {
        Log log = ao.get(Log.class, id);
        if (log == null) {
            throw new IllegalArgumentException("Log with ID " + id + " not found");
        }
        log.setActionType(actionType);
        log.setLogDetails(logDetails);
        log.setActorId(actorId);
        log.setLoggedAt(loggedAt);
        log.save();
        return log;
    }

    @Override
    public boolean delete(int id)
    {
        Log log = ao.get(Log.class, id);
        if (log == null) {
            return false;
        }
        ao.delete(log);
        return true;
    }

    @Override
    public List<Log> all()
    {
        try {
            return newArrayList(ao.find(Log.class));
        } catch (UncheckedExecutionException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Log> findByActionType(String actionType)
    {
        try {
            return newArrayList(ao.find(
                    Log.class,
                    Query.select().where("ACTION_TYPE = ?", actionType)
            ));
        } catch (UncheckedExecutionException e) {
            return new ArrayList<>();
        }
    }
}
