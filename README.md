# fixturefreeze

<img src="docs/logo.svg" alt="fixturefreeze mark" width="88" height="88">

**Copy a path into fixtures/ with freeze, then check that the live file still matches byte-for-byte.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/fixturefreeze?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

Golden files rot when nobody notices. fixturefreeze is a tiny freeze/check pair for generated samples, CLI output, or static HTML.

## Who it is for

Authors of tools that emit files and want a no-framework snapshot check.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/fixturefreeze.git --help
node src/cli.js --help
```

## Quick start

```bash
fixturefreeze freeze ./out.txt
fixturefreeze check ./out.txt
```

## CLI reference

Synopsis:

```text
fixturefreeze <freeze|check> <path>
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `freeze <path>` | Copy basename(path) into ./fixtures/. |
| `check <path>` | Compare path to fixtures/<basename>. Exit 1 on missing fixture or drift. |

Print the same text locally:

```bash
fixturefreeze --help
fixturefreeze --version
```

Expected version output:

```text
1.0.0
```

## Configuration

Fixtures live in ./fixtures relative to the current working directory. The frozen name is the basename of the source path. Copies overwrite.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | freeze succeeded, or check matched. |
| `1` | Bad usage, missing fixture, or bytes differ. |

## Examples

### Success path

```bash
fixturefreeze freeze sample.txt
fixturefreeze check sample.txt
```

check prints `"reason":"match"` and exits 0.

### Failure path

After freeze, edit the live file.

```bash
echo changed >> sample.txt
fixturefreeze check sample.txt
```

```json
{"ok":false,"reason":"drift"}
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
