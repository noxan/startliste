const fs = require('fs');

const { argv } = process;

if (argv.length < 3) {
  console.log('Please provice a file as argument.');
  process.exit(1);
}

const filename = argv[2];

console.log(filename);

const content = fs.readFileSync(filename, { encoding: 'utf8' });

const lines = content.replace(/\r/g, '').split('\n');

console.log(lines);
