const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getAllNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const result = await response.json();
  return result.data;
}

async function createNote({ title, body }) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  return await response.json();
}

async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

async function archiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  return await response.json();
}

async function unarchiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  return await response.json();
}

async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const result = await response.json();
  return result.data;
}

export {
  getAllNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
};
