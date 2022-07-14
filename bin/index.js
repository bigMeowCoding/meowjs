#!/usr/bin/env node
const script = process.argv[2];

const pkg = require("../package.json");

switch (script) {
  case "-v":
  case "--version":
    console.log(pkg.version);
    break;
}
