const HELP = `fixturefreeze 1.00 (1.0.0)

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
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
