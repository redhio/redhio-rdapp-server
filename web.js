const express = require('express');
const compress = require('compression');
const app = express();

app.use(compress());

app.use(express.static(__dirname + '/dist'));

app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/dist/index.html', { root: __dirname });
});

app.listen(process.env.PORT || 8080);
