const fs = require("fs");
const path = require("path");

const srcRoot = path.resolve(__dirname, "../src");
const distRoot = path.resolve(__dirname, "../dist");

const shouldSkip = (relativePath) => {
  if (!relativePath) {
    return false;
  }
  return relativePath.startsWith("assets/scss");
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const posthtml = require("posthtml");
const include = require("posthtml-include");

const renderHtml = (srcPath, relativePath) => {
  const destPath = path.join(distRoot, relativePath);
  ensureDir(path.dirname(destPath));
  fs.readFile(srcPath, "utf8", (err, input) => {
    if (err) {
      console.error(`Read failed: ${relativePath}`, err.message);
      return;
    }
    const result = posthtml([include({ root: srcRoot })]).process(input, { sync: true });
    fs.writeFile(destPath, result.html, "utf8", (writeErr) => {
      if (writeErr) {
        console.error(`Write failed: ${relativePath}`, writeErr.message);
      }
    });
  });
};

const copyFile = (srcPath, relativePath) => {
  if (shouldSkip(relativePath)) {
    return;
  }
  if (relativePath.endsWith(".html")) {
    renderHtml(srcPath, relativePath);
    return;
  }
  const destPath = path.join(distRoot, relativePath);
  ensureDir(path.dirname(destPath));
  fs.copyFile(srcPath, destPath, (err) => {
    if (err) {
      console.error(`Copy failed: ${relativePath}`, err.message);
    }
  });
};

const copyDirectory = (srcDir, relativeBase = "") => {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  fs.readdirSync(srcDir, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name);
    const relativePath = path.join(relativeBase, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, relativePath);
      return;
    }

    if (entry.isFile()) {
      copyFile(srcPath, relativePath);
    }
  });
};

const watchDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    return;
  }

  fs.watch(dir, { persistent: true, recursive: false }, (event, filename) => {
    if (!filename) {
      copyDirectory(srcRoot);
      return;
    }
    const srcPath = path.join(dir, filename);
    const relativePath = path.relative(srcRoot, srcPath);

    if (shouldSkip(relativePath)) {
      return;
    }

    if (!fs.existsSync(srcPath)) {
      console.log(`Deleted: ${relativePath}`);
      return;
    }

    const stats = fs.statSync(srcPath);
    if (stats.isDirectory()) {
      copyDirectory(srcPath, relativePath);
      watchDirectory(srcPath);
      return;
    }

    if (stats.isFile()) {
      console.log(`Synced: ${relativePath}`);
      copyFile(srcPath, relativePath);
    }
  });

  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      watchDirectory(path.join(dir, entry.name));
    }
  });
};

copyDirectory(srcRoot);
watchDirectory(srcRoot);

// Additionally watch HTML files with fs.watchFile for better reliability
const watchHtmlFiles = (dir, relativeBase = "") => {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(relativeBase, entry.name);

    if (entry.isDirectory()) {
      watchHtmlFiles(fullPath, relativePath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fs.watchFile(fullPath, { interval: 100 }, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
          console.log(`HTML changed: ${relativePath}`);
          const destPath = path.join(distRoot, relativePath);
          ensureDir(path.dirname(destPath));
          renderHtml(fullPath, relativePath);
        }
      });
    }
  });
};

watchHtmlFiles(srcRoot);

console.log("Syncing src/ to dist/ (excluding assets/scss)");
