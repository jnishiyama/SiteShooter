var express = require('express'),
    routes = require('./routes'),
    redis = require('redis-url').connect(process.env.REDISTOGO_URL);  
    
var app = module.exports = express();

// Configuration

app.configure(function(){
  //app.engine('haml',engines.haml);
  app.set('view engine', 'jade');	
  app.set('views', __dirname + '/views');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/save', routes.saveList);
app.post('/delete', routes.deleteItem);

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("express-bootstrap app running");
});