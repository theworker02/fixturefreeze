# fixturefreeze

<img src="docs/logo.svg" alt="fixturefreeze mark" width="96" height="96">

**Copy a path into fixtures/ with freeze, then check that the live file still matches byte-for-byte.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/fixturefreeze?display_name=release)
[![npm](https://img.shields.io/npm/v/%40magnexis/fixturefreeze.svg)](https://www.npmjs.com/package/%40magnexis/fixturefreeze)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/fixturefreeze/) · **Source:** [`theworker02/fixturefreeze`](https://github.com/theworker02/fixturefreeze) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/fixturefreeze/releases/tag/v1.0.0) · **npm:** [`@magnexis/fixturefreeze`](https://www.npmjs.com/package/%40magnexis/fixturefreeze)

## Why it exists

Golden files rot when nobody notices. fixturefreeze is a tiny freeze/check pair for generated samples, CLI output, or static HTML.

## Who it is for

Authors of tools that emit files and want a no-framework snapshot check.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm i -g @magnexis/fixturefreeze
fixturefreeze --help
```

Package page: https://www.npmjs.com/package/%40magnexis/fixturefreeze

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/fixturefreeze.git
fixturefreeze --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/fixturefreeze.git
cd fixturefreeze
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/fixturefreeze --help
node src/cli.js --help
```

## Quick start

```bash
fixturefreeze freeze ./out.txt
fixturefreeze check ./out.txt
```

## CLI reference

```text
fixturefreeze 1.00 (1.0.0)

Usage:
  fixturefreeze freeze <path> [options]
  fixturefreeze check <path> [options]
  fixturefreeze list [options]
  fixturefreeze update <path> [options]

freeze   copy a file or directory into ./fixtures/ (nested layout preserved)
check    compare the live path to the frozen copy, byte-for-byte
list     print relative paths stored under ./fixtures
update   same as freeze; intended for refreshing a drifted snapshot

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             JSON result
  --update           With check: rewrite the fixture when it drifted
                     (also accepted as a top-level alias for update)

Exit codes:
  0  freeze/list succeeded, or check matched
  1  missing path, drift, or unknown option

Examples:
  fixturefreeze freeze ./docs/index.html
  fixturefreeze freeze ./samples
  fixturefreeze check ./docs/index.html
  fixturefreeze check ./docs/index.html --update
  fixturefreeze list --json
```

Print the same text locally:

```bash
fixturefreeze --help
fixturefreeze -h
fixturefreeze --version
fixturefreeze -V
```

Expected version output:

```text
1.0.0
```

## Configuration

Copies live paths into `./fixtures/`, preserving nested layout for directories.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | freeze/list succeeded, or check matched (or --update rewrote). |
| `1` | Missing path, drift, or unknown option. |

## Examples

### Success path

Freeze a file and confirm it still matches.

```bash
fixturefreeze freeze ./docs/index.html
fixturefreeze check ./docs/index.html
```

```text
freeze file -> /abs/fixtures/docs/index.html
match  /abs/docs/index.html
```

### Failure path

Drift fails check unless --update is passed.

```bash
fixturefreeze check ./docs/index.html
```

```text
FAIL  drift  /abs/docs/index.html
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/fixturefreeze/](https://theworker02.github.io/fixturefreeze/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
