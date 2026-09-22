# fixturefreeze


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="fixturefreeze mark" width="96" height="96">

**Freeze files or directories into deterministic fixtures and verify them byte-for-byte later.**

[![JSR](https://jsr.io/badges/@theworker02/fixturefreeze)](https://jsr.io/@theworker02/fixturefreeze)
![version 1.2.0](https://img.shields.io/badge/version-1.2.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)

**Package:** [`@theworker02/fixturefreeze`](https://jsr.io/@theworker02/fixturefreeze)  ·  **Docs:** [GitHub Pages](https://theworker02.github.io/fixturefreeze/)  ·  **Source:** [`theworker02/fixturefreeze`](https://github.com/theworker02/fixturefreeze)

## Purpose

Copy files or directories into a `./fixtures/` tree and later verify live paths byte-for-byte against the frozen copy. Supports drift detection in docs, samples, and golden outputs.


## Highlights

- Freezes both files and nested directories.
- Preserves project-relative fixture structure.
- Performs byte-for-byte drift detection.
- Exposes fixture path resolution and existence checks.
- Fully documented TypeScript symbols on JSR.
- Trusted publishing through GitHub Actions with provenance.
- Zero runtime dependencies beyond Node built-ins.

## Add from JSR

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

## Public API

### Fixture operations

- `freeze(path, cwd)` — freeze a live file or directory.
- `check(path, cwd)` — compare live content against its fixture.
- `update(path, cwd)` — refresh a fixture.
- `list(cwd)` — list frozen fixture files.

### Paths and metadata

- `fixturesDir(cwd)` — resolve the fixture root.
- `frozenPath(path, cwd)` — resolve a live path's fixture location.
- `fixtureExists(path, cwd)` — test whether a fixture exists.
- `FIXTURE_DIRNAME` — canonical fixture directory name.
- `PACKAGE` — package identity and release metadata.

### Types

`FreezeResult`, `CheckResult`, and `PackageMetadata` are documented in JSR.

Examples:

```bash
node src/cli.js freeze ./docs/index.html
node src/cli.js check ./docs/index.html
```

## Development

```bash
node --test
```

## Publishing

The canonical package is published to JSR through GitHub Actions using OIDC trusted publishing.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/fixturefreeze)
- [Project site](https://theworker02.github.io/fixturefreeze/)
- [Source repository](https://github.com/theworker02/fixturefreeze)



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/fixturefreeze.git
cd fixturefreeze
node src/cli.js freeze ./docs/index.html
node src/cli.js freeze ./samples
node src/cli.js check ./docs/index.html
node src/cli.js check ./docs/index.html --update
node src/cli.js list --json
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Byte comparison only; text normalization or image perceptual diff is not supported.
- Fixture root defaults to `./fixtures` relative to the process cwd.
- Large binary trees can grow fixture storage quickly — scope freezes deliberately.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/fixturefreeze)
- [Project site](https://theworker02.github.io/fixturefreeze/)
- [Source repository](https://github.com/theworker02/fixturefreeze)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

fixturefreeze is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

