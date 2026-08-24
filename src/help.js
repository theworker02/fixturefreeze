const HELP = "fixturefreeze 1.00 (1.0.0)\n\nUsage:\n  fixturefreeze freeze <path>\n  fixturefreeze check <path>\n  fixturefreeze --help\n  fixturefreeze --version\n\nfreeze  copies <path> to ./fixtures/<basename>\ncheck   compares <path> to that frozen copy (byte-for-byte)\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  fixturefreeze freeze ./docs/index.html\n  fixturefreeze check ./docs/index.html\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
