// src/services/logService.ts

import { ILog } from '../models/Log';

const BASE = (contextPath: string) => `${contextPath}/rest/app/1.0/logs`;

export const getAllLogs = async (contextPath: string): Promise<ILog[]> =>
  (await fetch(BASE(contextPath), {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

export const getLogById = async (id: number, contextPath: string): Promise<ILog> =>
  (await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

export const addLog = async (log: ILog, contextPath: string): Promise<ILog> =>
  (await fetch(BASE(contextPath), {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  })).json();

export const editLog = async (log: ILog, contextPath: string): Promise<ILog> =>
  (await fetch(BASE(contextPath), {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  })).json();

export const deleteLog = async (id: number, contextPath: string): Promise<void> =>
  (await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();
