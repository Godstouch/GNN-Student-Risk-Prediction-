// Central fetch wrapper for the Flask backend. All API calls go through
// here so the base URL only needs to change in one place — e.g. when this
// moves from localhost during dev to the Raspberry Pi's local IP in a
// real school deployment.
//
// TODO before real deployment: replace this with the Pi's local network
// address (e.g. http://192.168.1.50:5000) or make it configurable via an
// environment variable so it doesn't need a code change per deployment.
const API_BASE = 'http://localhost:5000/api';

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json();
}

export function getMeta() {
  return request('/meta');
}

export function getStudents() {
  return request('/students');
}

export function getStudentDetail(id) {
  return request(`/students/${id}`);
}

export function getStudentExplanation(id) {
  return request(`/students/${id}/explanation`);
}
