/*var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text-plain'});
  response.end('Hello World\n');
});

server.listen(8000);
*/
/*
var seneca = require('seneca')();

seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
  var sum = msg.left + msg.right;
  respond(null, {answer: sum});
});

seneca.add({role: 'math', cmd: 'product'}, function (msg, respond) {
  var product = msg.left * msg.right;
  respond(null, {answer: product});
});

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, console.log);
seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log);

*/
/*
var seneca = require('seneca')();

seneca.add({cmd: 'wordCount'}, function (msg, respond) {
  var length = msg.phrase.split(' ').length;
  respond(null, {answer: length});
});

seneca.act({
  cmd: 'wordCount',
  phrase: 'hello world'
}, function (err, response) {
  console.log(response);
});

*/

/*
var seneca = require('seneca')();
function minimal_plugin(options) {
  console.log(options);
}

seneca.use(minimal_plugin, {foo: 'bar'});

*/
/*
var seneca = require('seneca')();
var express = require('express');
seneca.add('role:api,cmd:bazinga', function (args, done) {
  done(null, {bar: 'A'});
});
seneca.act('role:web', {
  use:{
    prefix: '/my-api',
    pin: {role:'api',cmd:'*'},
    map: {
      bazinga: {GET: true}
    }
  }
});

var app = express();
app.use(seneca.export('web'));//error here
app.use(require('seneca-web'));
app.listen(3000);


 */

var Seneca  = require("seneca");
var Express = require("express");
var Web     = require("seneca-web");

var seneca = Seneca();
var server = Express();

var config = {
  routes:{
    prefix : "/my-api",
    pin: "role:api,cmd:*",
    map:{
      bazinga: {
        GET: true
      }
    }
  }
};

seneca.use(Web, { adapter: "express", context: server })
seneca.act("role:web", config);
seneca.add("role:api,cmd:bazinga", bazinga);

server.listen(3000);


function bazinga(args, done){

  done(null, {
    bar: "Bazinga!"
  });
}