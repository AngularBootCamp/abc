#!/usr/bin/env node

// Kyle Cordes first wrote this in October 2015.
// It re-numbers all of the step directories,
// to sequential integers padded to two digits.
// You can renumber the directories,
// even to floating-point values,
// then run this to straighten it all out.
// Source control is highly recommended.

// Conveniently, this means nothing other than what comes in the node box,
// so no NPM or package management.

// Usage:
// ./renumber-steps.js dir [-f]
// dir is typically "apps/rxjs".
// -f makes it actually take action.

// Notes:
// It can help to remove all untracked gitignored files if you are having EPERM issues
// You can perform this with a `git clean -dfx`

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('CD to the top level of the repo.');
  console.error('usage: node_tools/renumber-steps.js dir [-f]');
  console.error('example: node _tools/renumber-steps.js apps/ngrx');
  process.exit(1);
}

const baseDir = process.argv[2];
const doIt = process.argv[3] == '-f';

const pattern = /^([a-zA-Z]+)([\d.]+)(-.+$)/;
const prefixPart = 1;
const numericPart = 2;
const namePart = 3;

const skipPattern = /SKIP/;

function fmtNum(n) {
  let r = n.toString();
  while (r.length < 3) {
    r = '0' + r;
  }
  return r;
}

let labelNum = -1;

fs.readdir(baseDir, (err, files) => {
  if (err) {
    throw err;
  }
  files
    .filter(file => {
      return pattern.test(file);
    })
    .sort((a, b) => {
      return (
        parseFloat(a.match(pattern)[numericPart]) -
        parseFloat(b.match(pattern)[numericPart])
      );
    })
    .map(file => {
      const fraction = labelNum - Math.floor(labelNum);
      labelNum = labelNum + (fraction < 0.6 ? 0.2 : 0.1);
      labelNum = Math.round(labelNum * 10) / 10;
      if (!skipPattern.test(file)) {
        labelNum = Math.ceil(labelNum);
      }

      let startNewSection = false;
      const outlineFileName = path.join(
        baseDir,
        file,
        '_explanation.md'
      );
      if (fs.existsSync(outlineFileName)) {
        const contents = fs
          .readFileSync(outlineFileName, 'utf8')
          .toString()
          .split('\n');
        startNewSection =
          contents.findIndex(line => line.match(/^# .*/) !== null) >=
          0;
      } else {
        console.log('no instructor file:', outlineFileName);
      }

      if (startNewSection && labelNum % 100 > 0) {
        console.log('starting new section', file);
        labelNum = labelNum - (labelNum % 100) + 100;
      }

      const prefix = file.match(pattern)[prefixPart];
      const name = file.match(pattern)[namePart];
      return {
        before: file,
        after: prefix + fmtNum(labelNum) + name,
        temp: 'TEMP-' + prefix + fmtNum(labelNum) + name
      };
    })
    .filter(pair => pair.before != pair.after)
    .map(pair => {
      console.log(
        path.join(baseDir, pair.before),
        '==>',
        path.join(baseDir, pair.after)
      );
      return pair;
    })
    .map(pair => {
      if (doIt) {
        fs.renameSync(
          path.join(baseDir, pair.before),
          path.join(baseDir, pair.temp)
        );
      }
      return pair;
    })
    .map(pair => {
      if (doIt) {
        fs.renameSync(
          path.join(baseDir, pair.temp),
          path.join(baseDir, pair.after)
        );
      }
    });
});
