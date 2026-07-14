// src/api/applyRequests.js

import api from "./axios";

/**
 * Create Apply Request
 * Backend Route: POST /api/apply-requests
 */
export async function createApplyRequest(payload) {
  const res = await api.post("/apply-requests", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/**
 * Get All Applications (Admin)
 */
export async function fetchApplyRequests() {
  const res = await api.get("/apply-requests");
  return res.data;
}

/**
 * Get Single Application
 */
export async function fetchApplyRequestById(id) {
  const res = await api.get(`/apply-requests/${id}`);
  return res.data;
}

/**
 * 🔥 Update Application
 * Backend Route: PUT /api/apply-requests/:id
 * payload should be FormData
 */
export async function updateApplyRequest(id, payload) {
  const res = await api.put(`/apply-requests/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/**
 * Delete Application
 */
export async function deleteApplyRequest(id) {
  const res = await api.delete(`/apply-requests/${id}`);
  return res.data;
}

export async function reorderApplyRequests(items) {
  const res = await api.put("/apply-requests/reorder", {
    items,
  });

  return res.data;
}