var fs = require('fs');

const readToken = () => {
  let file = __dirname + '/jwt.txt';
  const data = fs.readFileSync(file, 'utf8', function (err, data) {
    if (err) {
      console.log('error', err);
    }
  });

  return data;
};

const writeToken = (data) => {
  let file = __dirname + '/jwt.txt';
  fs.writeFile(file, data, function (err) {
    if (err) {
      console.log('error', err);
    }
  });
};

module.exports = { readToken, writeToken };
