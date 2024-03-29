const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const { argv } = process;

const processFile = fileName => {
  const fileContent = fs.readFileSync(fileName, { encoding: 'utf8' });

  const lines = fileContent
    .replace(/\r/g, '')
    .split('\n')
    .filter(line => line);

  const content = {
    lines: {
      header: lines.slice(0, 5),
      couples: lines.slice(6, lines.length - 1)
    },
    section: lines[4].split('\t')[3],
    age: lines[2].split('\t')[3],
    rank: lines[3].split('\t')[3],
    date: lines[1].split('\t')[1],
    couples: lines.slice(6, lines.length - 1).map(couple => couple.split('\t'))
  };

  const formattedDate = content.date.replace(', ', ' - ');

  const result = {
    headline: `${content.age} ${content.rank} ${content.section} - ${formattedDate} Uhr`,
    couples: content.couples.map(couple => ({
      name: [
        couple.slice(0, 1),
        couple.slice(1, 3).join(' '),
        '/',
        couple.slice(3, 5).join(' ')
      ].join(' '),
      club: couple[5]
    }))
  };

  const output = `<ASCII-MAC>
<DefineParaStyle:Starter list:Headline=<cSize:18><pBodyAlignment:Center>>
<DefineParaStyle:Starter list:Content>
<DefineCharStyle:Starter list:Name=<cSize:14>>
<DefineCharStyle:Starter list:Club=<cSize:12>>
<ParaStyle:Starter list:Headline>${result.headline}
${result.couples
    .map(
      couple =>
        `<ParaStyle:Starter list:Content><CharStyle:Starter list:Name>${couple.name}
<CharStyle:Starter list:Club>${couple.club}`
    )
    .join('\n')}`;

  fs.writeFileSync(path.basename(fileName), iconv.encode(output, 'macroman'), {
    encoding: 'utf-8'
  });
};

if (argv.length < 3) {
  console.log('Please provice a file as argument.');
  process.exit(1);
}

const fileName = argv[2];

console.log(fileName);

const fileStats = fs.statSync(fileName);

if (fileStats.isDirectory()) {
  const directory = fs.readdirSync(fileName);

  directory.forEach(directoryFileName => {
    processFile(path.join(fileName, directoryFileName));
  });
} else {
  processFile(fileName);
}
