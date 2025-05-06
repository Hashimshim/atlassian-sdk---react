// src/services/ambassadorService.ts

import { IAmbassador } from '../models/Ambassador';

const BASE = (contextPath: string) => `${contextPath}/rest/app/1.0/ambassadors`;

export const getAllAmbassadors = async (contextPath: string): Promise<IAmbassador[]> =>
  (await fetch(BASE(contextPath), {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

export const getAmbassadorById = async (id: string, contextPath: string): Promise<IAmbassador> =>
  (await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();

export const addAmbassador = async (amb: IAmbassador, contextPath: string): Promise<IAmbassador> =>
  (await fetch(BASE(contextPath), {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(amb),
  })).json();

export const editAmbassador = async (amb: IAmbassador, contextPath: string): Promise<IAmbassador> =>
  (await fetch(BASE(contextPath), {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(amb),
  })).json();

export const deleteAmbassador = async (id: string, contextPath: string): Promise<void> =>
  (await fetch(`${BASE(contextPath)}/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })).json();
