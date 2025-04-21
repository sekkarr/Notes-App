class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML += `
      <section>
        <h2>Tambah Catatan Baru</h2>
        <form id="note-form">
          <input type="text" id="note-title" placeholder="Judul Catatan" required />
          <textarea id="note-body" placeholder="Deskripsi" required></textarea>
          <button type="submit">Tambah Catatan</button>
        </form>
      </section>

      <section id="notes-section">
        <h2>Daftar Catatan Anda: </h2>
        <div id="notes-container" class="notes-grid"></div>
      </section>

      <section>
        <button id="view-archived">Lihat Arsip</button>
      </section>

      <section id="archived-notes-section" style="display: none;">
        <h2>Catatan Diarsipkan:</h2>
        <div id="archived-notes-container" class="notes-grid"></div>
      </section>
    `;

    this.querySelector("#note-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.querySelector("#note-title").value;
      const body = this.querySelector("#note-body").value;

      this.dispatchEvent(
        new CustomEvent("note-submitted", {
          bubbles: true,
          detail: { title, body },
        })
      );

      e.target.reset();
    });

    this.querySelector("#view-archived").addEventListener("click", () => {
      const archivedSection = this.querySelector("#archived-notes-section");
      const notesSection = this.querySelector("#notes-section");

      if (archivedSection.style.display === "none") {
        archivedSection.style.display = "block";
        notesSection.style.display = "none";
        this.querySelector("#view-archived").textContent =
          "Lihat Daftar Catatan";
      } else {
        archivedSection.style.display = "none";
        notesSection.style.display = "block";
        this.querySelector("#view-archived").textContent = "Lihat Arsip";
      }
    });
  }
}

customElements.define("note-form", NoteForm);
