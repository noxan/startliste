const fs = require('fs');

const { argv } = process;

if (argv.length < 3) {
  console.log('Please provice a file as argument.');
  process.exit(1);
}

const filename = argv[2];

console.log(filename);

const content = fs.readFileSync(filename, { encoding: 'utf8' });

const lines = content
  .replace(/\r/g, '')
  .split('\n')
  .filter(line => line);

const header = lines.slice(0, 5);
const couples = lines.slice(6, lines.length - 1);

console.log(header);
console.log(couples);
