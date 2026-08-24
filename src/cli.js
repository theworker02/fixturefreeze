#!/usr/bin/env node
const { freeze, check, list, update } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (const arg of argv) {
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--update") flags.update = true;
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  const [command, target] = positional;
  if (!command) fail("usage: fixturefreeze <freeze|check|list|update> [path]");

  if (command === "list") {
    const files = list();
    if (flags.json) process.stdout.write(`${JSON.stringify({ files }, null, 2)}\n`);
    else {
      process.stdout.write(`${files.length} fixture(s)\n`);
      for (const file of files) process.stdout.write(`  ${file}\n`);
    }
    process.exit(0);
  }

  if (!target) fail(`usage: fixturefreeze ${command} <path>`);

  if (command === "freeze" || command === "update" || flags.update && command === "freeze") {
    const result = command === "update" ? update(target) : freeze(target);
    if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    else process.stdout.write(`${command} ${result.kind} -> ${result.dest}\n`);
    process.exit(0);
  }

  if (command === "check") {
    let result = check(target);
    if (!result.ok && flags.update) {
      result = { ...update(target), updated: true, previous: result.reason };
    }
    if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    else {
      if (result.ok) process.stdout.write(`match  ${result.src}\n`);
      else process.stdout.write(`FAIL  ${result.reason}  ${result.src}\n`);
    }
    process.exit(result.ok || result.updated ? 0 : 1);
  }

  fail("usage: fixturefreeze <freeze|check|list|update> [path]");
} catch (err) {
  fail(err.message);
}
