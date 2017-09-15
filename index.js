const fs = require('fs');

const { argv } = process;

if (argv.length < 3) {
  console.log('Please provice a file as argument.');
  process.exit(1);
}

const fileName = argv[2];

console.log(fileName);

const fileContent = fs.readFileSync(fileName, { encoding: 'utf8' });

const lines = fileContent
  .replace(/\r/g, '')
  .split('\n')
  .filter(line => line);

const header = lines.slice(0, 5);
const couples = lines.slice(6, lines.length - 1);

console.log(header);
console.log(couples);
