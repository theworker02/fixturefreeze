#!/usr/bin/env node
const { freeze, check } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const [command, target] = args.filter((a) => !a.startsWith("-"));
if (!command || !target || !["freeze", "check"].includes(command)) {
  process.stderr.write("usage: fixturefreeze <freeze|check> <path>\n");
  process.exit(1);
}
const result = command === "freeze" ? freeze(target) : check(target);
process.stdout.write(`${JSON.stringify(result)}\n`);
process.exit(result.ok === false ? 1 : 0);
