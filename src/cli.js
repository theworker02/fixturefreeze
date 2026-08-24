#!/usr/bin/env node
const { freeze, check } = require("./index.js");

const [command, target] = process.argv.slice(2);
if (!command || !target || !["freeze", "check"].includes(command)) {
  process.stderr.write("usage: fixturefreeze <freeze|check> <path>\n");
  process.exit(1);
}
const result = command === "freeze" ? freeze(target) : check(target);
process.stdout.write(`${JSON.stringify(result)}\n`);
process.exit(result.ok === false ? 1 : 0);
