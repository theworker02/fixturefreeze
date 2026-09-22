# Asset inventory â€” fixturefreeze

## Repository surfaces

| Asset | Location / notes |
|-------|------------------|
| Source tree | Repository root / language packages |
| Tests | `test/`, `tests/`, CI workflows if present |
| Docs | `README.md`, `docs/` |
| Diligence room | `docs/acquisition/` |
| License / notices | `LICENSE`, transition notices if present |
| Funding | `.github/FUNDING.yml` |
| CI | `.github/workflows/` if present |
| Branding | logos/assets folders if present |

## Capability highlights

- Freezes both files and nested directories.
- Preserves project-relative fixture structure.
- Performs byte-for-byte drift detection.
- Exposes fixture path resolution and existence checks.
- Fully documented TypeScript symbols on JSR.
- Trusted publishing through GitHub Actions with provenance.
- Zero runtime dependencies beyond Node built-ins.
- `freeze(path, cwd)` Ã¢â‚¬â€ freeze a live file or directory.
- `check(path, cwd)` Ã¢â‚¬â€ compare live content against its fixture.
- `update(path, cwd)` Ã¢â‚¬â€ refresh a fixture.
- `list(cwd)` Ã¢â‚¬â€ list frozen fixture files.
- `fixturesDir(cwd)` Ã¢â‚¬â€ resolve the fixture root.

## Usually excluded

Seller personal accounts, unrelated repos, and unreissued registry tokens â€” unless listed in the definitive agreement.

*Updated: 2026-09-22*
