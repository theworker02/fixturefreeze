const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { freeze, check } = require("../src/index.js");

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
});
