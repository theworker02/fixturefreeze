const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { freeze, check, list } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("fixturefreeze", () => {
  it("freezes a file and detects later drift", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "fixturefreeze-"));
    const src = path.join(cwd, "sample.txt");
    fs.writeFileSync(src, "alpha\n");
    freeze(src, cwd);
    assert.equal(check(src, cwd).ok, true);
    fs.writeFileSync(src, "beta\n");
    assert.equal(check(src, cwd).ok, false);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("freezes a directory and lists nested fixtures", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "fixturefreeze-"));
    const dir = path.join(cwd, "samples");
    fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, "a.txt"), "a\n");
    freeze(dir, cwd);
    assert.equal(check(dir, cwd).ok, true);
    assert.ok(list(cwd).includes("samples/a.txt") || list(cwd).includes(path.join("samples", "a.txt").replaceAll("\\", "/")));
    fs.writeFileSync(path.join(dir, "a.txt"), "b\n");
    assert.equal(check(dir, cwd).ok, false);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("CLI check --update rewrites a drifted fixture", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "fixturefreeze-"));
    fs.writeFileSync(path.join(cwd, "x.txt"), "old\n");
    spawnSync(process.execPath, [cli, "freeze", "x.txt"], { encoding: "utf8", cwd });
    fs.writeFileSync(path.join(cwd, "x.txt"), "new\n");
    const updated = spawnSync(process.execPath, [cli, "check", "x.txt", "--update", "--json"], {
      encoding: "utf8",
      cwd,
    });
    assert.equal(updated.status, 0);
    assert.equal(JSON.parse(updated.stdout).updated, true);
    assert.equal(fs.readFileSync(path.join(cwd, "fixtures", "x.txt"), "utf8"), "new\n");
    const listed = spawnSync(process.execPath, [cli, "list"], { encoding: "utf8", cwd });
    assert.equal(listed.status, 0);
    assert.match(listed.stdout, /x.txt/);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
});
