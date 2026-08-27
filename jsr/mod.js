/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

const PACKAGE = Object.freeze({ name: "@theworker02/fixturefreeze", version: "1.2.0", runtime: "node", registry: "jsr" });
const FIXTURE_DIRNAME = "fixtures";

function fixturesDir(cwd = process.cwd()) {
  return path.resolve(cwd, FIXTURE_DIRNAME);
}

function frozenPath(filePath, cwd = process.cwd()) {
  const src = path.resolve(filePath);
  const rel = path.relative(path.resolve(cwd), src);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return path.join(fixturesDir(cwd), path.basename(src));
  return path.join(fixturesDir(cwd), rel);
}

function fixtureExists(filePath, cwd = process.cwd()) {
  return fs.existsSync(frozenPath(filePath, cwd));
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) copyRecursive(path.join(src, name), path.join(dest, name));
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function freeze(filePath, cwd = process.cwd()) {
  const src = path.resolve(filePath);
  if (!fs.existsSync(src)) throw new Error(`path not found: ${src}`);
  fs.mkdirSync(fixturesDir(cwd), { recursive: true });
  const dest = frozenPath(src, cwd);
  copyRecursive(src, dest);
  return { ok: true, src, dest, kind: fs.statSync(src).isDirectory() ? "dir" : "file" };
}

function listFiles(root, acc = []) {
  const stat = fs.statSync(root);
  if (stat.isFile()) { acc.push(root); return acc; }
  for (const name of fs.readdirSync(root)) listFiles(path.join(root, name), acc);
  return acc;
}

function check(filePath, cwd = process.cwd()) {
  const src = path.resolve(filePath);
  const dest = frozenPath(src, cwd);
  if (!fs.existsSync(src)) return { ok: false, reason: "missing live path", src, dest };
  if (!fs.existsSync(dest)) return { ok: false, reason: "missing fixture", src, dest };
  const srcDir = fs.statSync(src).isDirectory();
  const destDir = fs.statSync(dest).isDirectory();
  if (srcDir !== destDir) return { ok: false, reason: "type mismatch", src, dest };
  if (!srcDir) {
    const same = Buffer.compare(fs.readFileSync(src), fs.readFileSync(dest)) === 0;
    return { ok: same, reason: same ? "match" : "drift", src, dest };
  }
  const live = listFiles(src).map((f) => path.relative(src, f).replaceAll("\\", "/")).sort();
  const frozen = listFiles(dest).map((f) => path.relative(dest, f).replaceAll("\\", "/")).sort();
  if (live.join("\0") !== frozen.join("\0")) return { ok: false, reason: "file list drift", src, dest, live, frozen };
  for (const rel of live) {
    const a = fs.readFileSync(path.join(src, rel));
    const b = fs.readFileSync(path.join(dest, rel));
    if (Buffer.compare(a, b) !== 0) return { ok: false, reason: `drift ${rel}`, src, dest };
  }
  return { ok: true, reason: "match", src, dest, files: live.length };
}

function list(cwd = process.cwd()) {
  const dir = fixturesDir(cwd);
  if (!fs.existsSync(dir)) return [];
  return listFiles(dir).map((file) => path.relative(dir, file).replaceAll("\\", "/"));
}

function update(filePath, cwd = process.cwd()) { return freeze(filePath, cwd); }

export { PACKAGE, FIXTURE_DIRNAME, fixturesDir, frozenPath, fixtureExists, freeze, check, list, update };
