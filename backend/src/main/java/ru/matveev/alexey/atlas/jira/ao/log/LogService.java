package ru.matveev.alexey.atlas.jira.ao.log;

import com.atlassian.activeobjects.tx.Transactional;

import java.util.List;

@Transactional
public interface LogService {
    Log add(String actionType,
            String logDetails,
            String actorId,
            String loggedAt);

    Log edit(int id,
             String actionType,
             String logDetails,
             String actorId,
             String loggedAt);

    boolean delete(int id);

    List<Log> all();

    /**
     * Find all logs matching exactly the given action type.
     */
    List<Log> findByActionType(String actionType);
}
