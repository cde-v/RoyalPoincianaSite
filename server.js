var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('server/routes');

console.log(process.env.PORT);

var PORT = process.env.PORT || 3000;

app.set('port', PORT || 3000);

console.log(process.env.PORT);

app.use(bodyParser.json());

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

console.log(process.env.PORT);

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

console.log(process.env.PORT);
