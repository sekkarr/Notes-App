import "./styles.css";
import "./components/app-bar.js";
import "./components/note-form.js";
import "./components/note-item.js";
import {
  getAllNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
} from "./data/remote/notes-api.js";
import { showLoading, hideLoading } from "./utils.js";
import "./components/loading-indicator.js";

const notesContainer = document.getElementById("notes-container");
const archivedNotesContainer = document.getElementById(
  "archived-notes-container"
);

function renderNotes(notes) {
  notesContainer.innerHTML = "";
  const activeNotes = notes.filter((note) => !note.archived);
  activeNotes.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.setNote(note);

    noteItem.addEventListener("delete", async (e) => {
      showLoading();
      await deleteNote(e.detail);
      loadNotes();
    });

    noteItem.addEventListener("archive", async (e) => {
      showLoading();
      await archiveNote(e.detail);
      loadNotes();
    });

    notesContainer.appendChild(noteItem);
  });

  archivedNotesContainer.innerHTML = "";
  const archivedNotes = notes.filter((note) => note.archived);
  archivedNotes.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.setNote(note);

    noteItem.addEventListener("delete", async (e) => {
      showLoading();
      await deleteNote(e.detail);
      loadNotes();
    });

    noteItem.addEventListener("unarchive", async (e) => {
      showLoading();
      await unarchiveNote(e.detail);
      loadNotes();
    });

    archivedNotesContainer.appendChild(noteItem);
  });
}

function renderArchivedNotes(notes) {
  archivedNotesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteItem = document.createElement("note-item");
    noteItem.setNote(note);

    noteItem.addEventListener("delete", async (e) => {
      showLoading();
      await deleteNote(e.detail);
      loadNotes();
    });

    noteItem.addEventListener("unarchive", async (e) => {
      showLoading();
      await unarchiveNote(e.detail);
      loadNotes();
    });

    archivedNotesContainer.appendChild(noteItem);
  });
}

async function loadArchivedNotes() {
  const archivedNotes = await getArchivedNotes();
  renderArchivedNotes(archivedNotes);
}

async function loadNotes() {
  showLoading();
  const notes = await getAllNotes();
  console.log("📋 Notes yang didapat:", notes);
  renderNotes(notes);
  hideLoading();
}

document
  .querySelector("note-form")
  .addEventListener("note-submitted", async (e) => {
    showLoading();
    await createNote(e.detail);
    loadNotes();

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = "Catatan berhasil ditambahkan!";

    document.body.appendChild(notification);

    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 1000);
  });

loadNotes();
loadArchivedNotes();
