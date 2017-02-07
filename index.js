var pg = require('pg');
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/favicon.ico', function(request, response) {
  response.sendFile('/favicon.ico')
});

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/about', function(request, response) {
  response.render('pages/about')
});

app.get('/face', function(request, response) {
  response.send(cool());
});

app.get('/media', function(request, response) {
  response.render('pages/media')
});

app.get('/twitter', function(request, response){
  response.render('pages/twitter');
})

app.get('/a2', function(request, response){
  response.render('pages/assignment2');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
