const { execSync } = require('child_process');

const target = process.argv[2];
let name = process.argv[3];
const rest = [...process.argv.slice(4)];
const startsWithDigit = /^\d/;

if (!target || !name) {
  console.error('Must supply target and project name.');
  process.exit(1);
}

// Use 'abc-' as the default prefix for numbered steps.
if (startsWithDigit.test(name)) {
  name = 'abc-' + name;
}

if (!validFullOrPartialProjectName(name)) {
  console.error(`Invalid partial project name "${name}"`);
  process.exit(1);
}

if (!validTarget(target)) {
  console.error(`Invalid target "${target}"`);
  process.exit(1);
}

const matchingProjects = getAllMatchingProjectNames(name, target);

if (matchingProjects.length === 1) {
  const fullProjectName = matchingProjects[0];

  if (!validFullOrPartialProjectName(fullProjectName)) {
    console.error(`Invalid project name "${fullProjectName}"`);
    process.exit(1);
  }

  const cmd = [
    'npx',
    'nx',
    target,
    '--outputStyle=dynamic-legacy',
    fullProjectName,
    ...rest
  ].join(' ');

  execSync(cmd, { stdio: 'inherit' });
} else if (matchingProjects.length > 1) {
  console.log(
    `Too many projects match "${name}". Please be more specific!`
  );
  console.table(matchingProjects);
  process.exit(1);
} else {
  console.error(`Cannot find a project matching "${name}"`);
  process.exit(1);
}

// Returns true if the specified name is at least two characters long
// (since that's what `nx show` requires), and contains only letters,
// numbers, underscores, dashes, and/or periods. We could get stricter,
// but this is mostly about keeping undesirable characters out of an
// execSync() call.
function validFullOrPartialProjectName(name) {
  return name.length >= 2 && /^[\w-.]+$/.test(name);
}

// Returns true if the specified target is in the list of supported
// targets.
function validTarget(target) {
  return ['lint', 'test', 'e2e', 'serve', 'build'].includes(target);
}

// Returns an array of all project names that start with the specified
// name (which might be a full project name) and support the specified
// target. The list is sorted in alphabetical order.
//
// Note: It would probably be better to use the @nx/devkit API to gather
// this information instead of executing a command each time, but this
// works well enough for now.
//
function getAllMatchingProjectNames(partialProjectName, target) {
  const cmd = `
    npx nx show projects
    --json
    --projects ${partialProjectName}*
    --with-target ${target}
  `.replaceAll('\n', ' ');

  const output = execSync(cmd);

  return JSON.parse(output).sort();
}
