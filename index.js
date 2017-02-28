var pg = require('pg');
var cool = require('cool-ascii-faces');
var http = require('http');
var express = require('express'),
  app = module.exports.app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var io = require('socket.io').listen(server);

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
});

app.get('/a2', function(request, response){
  response.render('pages/assignment2');
});

app.get('/chat', function(request, response) {
  response.render('pages/chat');
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

io.on('connect', function(socket){
  io.emit('chat', "Welcome to the Trump is Love Chatroom!");

  socket.on('chat', function(msg){
    console.log(msg);
    io.emit('chat', msg);
  });
});
