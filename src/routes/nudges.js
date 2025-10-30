import { GET, POST, PATCH, DEL, qs } from "../api/http";

export const getNudges = (filters = {}) => {

    return GET(`/nudges/${qs(filters)}`);
};


export const getNudge     = (id)              => GET(`/nudges/${id}`);
export const createNudge  = (payload, token)  => POST(`/nudges/`, payload, token);
export const updateNudge  = (id, body, token) => PATCH(`/nudges/${id}`, body, token);
export const deleteNudge  = (id, token)       => DEL(`/nudges/${id}`, token);