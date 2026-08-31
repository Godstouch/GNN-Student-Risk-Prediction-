// Lightweight "who's using this device right now" tracking — not real
// authentication. Shared classroom devices don't need passwords; they
// need to know which teacher's name to attach to intervention logs.
// Swap this for real auth later if the project requires it — every
// consumer of this reads through the two functions below, so the
// storage mechanism can change without touching component code.

const STORAGE_KEY = 'earlyflag_current_teacher';

export const MOCK_TEACHERS = [
  'Mr. Owusu',
  'Mrs. Asante',
  'Ms. Boateng',
  'Mr. Darko',
];

export function getCurrentTeacher() {
  return localStorage.getItem(STORAGE_KEY);
}

export function setCurrentTeacher(name) {
  localStorage.setItem(STORAGE_KEY, name);
}

export function clearCurrentTeacher() {
  localStorage.removeItem(STORAGE_KEY);
}
