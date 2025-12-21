const http = require("http");
const path = require("path");
const fs = require("fs");
const { URL } = require("url");

const root = path.resolve(__dirname, "../dist");
const port = Number(process.env.PORT || 5173);
const clients = new Set();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === "/__reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1000\n\n");
    clients.add(res);

    req.on("close", () => {
      clients.delete(res);
    });
    return;
  }

  let filePath = path.join(root, decodeURIComponent(requestUrl.pathname));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

let reloadTimer = null;
const triggerReload = () => {
  if (reloadTimer) {
    clearTimeout(reloadTimer);
  }
  reloadTimer = setTimeout(() => {
    clients.forEach((res) => {
      res.write("data: reload\n\n");
    });
  }, 80);
};

const watchDirectory = (dir) => {
  fs.watch(dir, { persistent: true }, (event, filename) => {
    triggerReload();
  });

  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      watchDirectory(path.join(dir, entry.name));
    }
  });
};

watchDirectory(root);

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
