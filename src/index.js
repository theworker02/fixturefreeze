const fs = require("node:fs");
const path = require("node:path");

function fixturesDir(cwd = process.cwd()) {
  return path.resolve(cwd, "fixtures");
}

function frozenPath(filePath, cwd = process.cwd()) {
  return path.join(fixturesDir(cwd), path.basename(filePath));
}

function freeze(filePath, cwd = process.cwd()) {
  const src = path.resolve(filePath);
  fs.mkdirSync(fixturesDir(cwd), { recursive: true });
  const dest = frozenPath(src, cwd);
  fs.copyFileSync(src, dest);
  return { src, dest };
}

function check(filePath, cwd = process.cwd()) {
  const src = path.resolve(filePath);
  const dest = frozenPath(src, cwd);
  if (!fs.existsSync(dest)) {
    return { ok: false, reason: "missing fixture", src, dest };
  }
  const same = Buffer.compare(fs.readFileSync(src), fs.readFileSync(dest)) === 0;
  return { ok: same, reason: same ? "match" : "drift", src, dest };
}

module.exports = { fixturesDir, frozenPath, freeze, check };
