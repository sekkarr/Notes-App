class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.style.display = "none";
    this.innerHTML = `<p>Loading...</p>`;
  }

  show() {
    this.style.display = "block";
  }

  hide() {
    this.style.display = "none";
  }
}

customElements.define("loading-indicator", LoadingIndicator);
