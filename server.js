const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3895; // Kinda spells express...sorta?

const app = express();
const morgan = require('morgan');

app.use(express.static(path.join(__dirname, 'dist')));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => { console.log('Server running on port ' + port) });
