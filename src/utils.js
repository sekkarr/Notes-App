export function showLoading() {
  let loading = document.querySelector("loading-indicator");
  if (!loading) {
    loading = document.createElement("loading-indicator");
    document.body.appendChild(loading);
  }
  loading.show();
}

export function hideLoading() {
  const loading = document.querySelector("loading-indicator");
  if (loading) {
    loading.hide();
  }
}
