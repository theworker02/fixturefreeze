# Buyer evaluation â€” fixturefreeze

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```bash
deno add jsr:@theworker02/fixturefreeze
```
```ts
import {
  check,
  fixtureExists,
  freeze,
  frozenPath,
  PACKAGE,
} from "@theworker02/fixturefreeze";

const result = freeze("./docs/index.html");
console.log(result.dest);
console.log(fixtureExists("./docs/index.html"));
console.log(frozenPath("./docs/index.html"));
console.log(check("./docs/index.html"));
console.log(PACKAGE.version);
```
```bash
git clone https://github.com/theworker02/fixturefreeze.git
cd fixturefreeze
node src/cli.js --help
```
```bash
node src/cli.js freeze ./docs/index.html
node src/cli.js check ./docs/index.html
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
