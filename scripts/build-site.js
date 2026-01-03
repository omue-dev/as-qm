const fs = require("fs");
const path = require("path");
const posthtml = require("posthtml");
const include = require("posthtml-include");

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

const renderHtml = async (srcPath, relativePath) => {
  const destPath = path.join(distRoot, relativePath);
  ensureDir(path.dirname(destPath));
  const input = await fs.promises.readFile(srcPath, "utf8");
  const result = await posthtml([include({ root: srcRoot })]).process(input, {
    sync: true,
  });
  await fs.promises.writeFile(destPath, result.html, "utf8");
};

const copyFile = async (srcPath, relativePath) => {
  if (shouldSkip(relativePath)) {
    return;
  }
  if (relativePath.endsWith(".html")) {
    await renderHtml(srcPath, relativePath);
    return;
  }
  const destPath = path.join(distRoot, relativePath);
  ensureDir(path.dirname(destPath));
  await fs.promises.copyFile(srcPath, destPath);
};

const copyDirectory = async (srcDir, relativeBase = "") => {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const relativePath = path.join(relativeBase, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, relativePath);
      continue;
    }

    if (entry.isFile()) {
      await copyFile(srcPath, relativePath);
    }
  }
};

copyDirectory(srcRoot).catch((err) => {
  console.error(err);
  process.exit(1);
});
