class NoteItem extends HTMLElement {
  setNote(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <div class="note-actions">
          <button class="delete-button"> Hapus </button>
          <button class="archive-button">
            ${this._note.archived ? "Kembalikan" : "Arsip"}
          </button>
        </div>
      </div>
    `;

    this.querySelector(".delete-button").addEventListener("click", () => {
      const confirmed = confirm("Yakin ingin menghapus catatan ini?");
      if (confirmed) {
        this.dispatchEvent(
          new CustomEvent("delete", {
            detail: this._note.id,
            bubbles: true,
            composed: true,
          })
        );
      }
    });

    this.querySelector(".archive-button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent(this._note.archived ? "unarchive" : "archive", {
          detail: this._note.id,
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("note-item", NoteItem);
