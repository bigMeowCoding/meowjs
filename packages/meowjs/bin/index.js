#!/usr/bin/env node
const script = process.argv[2];

const pkg = require("../package.json");
const dev = require("../../meow-webpack/src/dev");

switch (script) {
  case "-v":
  case "--version":
    console.log(pkg.version);
    break;
  case 'dev':
    dev()
}
