// Dev-only live reload using SSE from the local dev server.
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  const source = new EventSource("/__reload");
  source.onmessage = () => {
    window.location.reload();
  };
}
