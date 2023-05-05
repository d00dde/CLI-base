const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'file.txt');
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(filePath, '', (err) => {
      if (err) throw err;
    });
  }
});

console.log('Let`s try input some!');
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  fs.appendFile(filePath, data.toString(), (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', function () {
  console.log('Bye');
  process.exit(0);
});
