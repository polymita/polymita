#!/usr/bin/env node

var path = require('path'),
    jake = require('jake'),
    args = process.argv.slice(2),
    jakefile = require('module')._resolveFilename('polymita/Jakefile.js');

if (args[0] == 'jake') {
    args.shift()
}

args.push('--jakefile')
args.push(jakefile)

if (args.length == 2) {
    args.push('--tasks')
}

jake.run.apply(jake, args);