package ru.matveev.alexey.atlas.jira.ao.ambassador;

import com.atlassian.activeobjects.external.ActiveObjects;
import net.java.ao.Query;
import com.google.common.util.concurrent.UncheckedExecutionException;
import javax.inject.Inject;
import javax.inject.Named;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.collect.Lists.newArrayList;

import java.util.ArrayList;
import java.util.List;

@Named
public class AmbassadorServiceImpl implements AmbassadorService {
    private final ActiveObjects ao;

    @Inject
    public AmbassadorServiceImpl(ActiveObjects ao) {
        this.ao = checkNotNull(ao);
    }

    @Override
    public Ambassador add(String accountId,
                          String customFieldId,
                          String contextId,
                          String createdAt) {
        try{
            Ambassador amb = ao.create(Ambassador.class);
            amb.setAccountId(accountId);
            amb.setCustomFieldId(customFieldId);
            amb.setContextId(contextId);
            amb.setCreatedAt(createdAt);
            amb.save();
            return amb;
        } catch (java.lang.Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Ambassador edit(int id,
                           String accountId,
                           String customFieldId,
                           String contextId,
                           String createdAt) {
        Ambassador amb = ao.get(Ambassador.class, id);
        if (amb == null) {
            throw new IllegalArgumentException("Ambassador with ID " + id + " not found");
        }
        amb.setAccountId(accountId);
        amb.setCustomFieldId(customFieldId);
        amb.setContextId(contextId);
        amb.setCreatedAt(createdAt);
        amb.save();
        return amb;
    }

    @Override
    public boolean delete(int id) {
        Ambassador amb = ao.get(Ambassador.class, id);
        if (amb == null) {
            return false;
        }
        ao.delete(amb);
        return true;
    }

    @Override
    public List<Ambassador> all() {
        try {
            return newArrayList(ao.find(Ambassador.class));
        } catch (UncheckedExecutionException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Ambassador> findByContext(String contextId) {
        try {
            return newArrayList(
                    ao.find(
                            Ambassador.class,
                            Query.select().where("CONTEXT_ID = ?", contextId)
                    )
            );
        } catch (UncheckedExecutionException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Ambassador> findByAmbassadorById(String accountId) {
        return newArrayList(
                ao.find(
                        Ambassador.class,
                        Query.select().where("ACCOUNT_ID = ?", accountId)
                )
        );
    }
}
