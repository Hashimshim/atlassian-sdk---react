package ru.matveev.alexey.atlas.jira.ao.ambassador;

import com.atlassian.activeobjects.tx.Transactional;
import java.util.List;

@Transactional
public interface AmbassadorService {
    Ambassador add(String accountId,
                   String customFieldId,
                   String contextId,
                   String createdAt);

    Ambassador edit(int id,
                    String accountId,
                    String customFieldId,
                    String contextId,
                    String createdAt);

    boolean delete(int id);

    List<Ambassador> all();

    /**
     * Find ambassadors by contextId.
     */
    List<Ambassador> findByContext(String contextId);

    /**
     * Find an ambassador by its ID.
     * @param id the record ID
     * @return the Ambassador, or null if not found
     */
    List<Ambassador> findByAmbassadorById(String accountId);
}
