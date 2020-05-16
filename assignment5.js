var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Allow for handling both urlencoded and json objects for POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4512);

app.get('/', function(req, res){
  res.render('home');
});

//The route for the GET request
app.get('/show-data', function(req, res){
  //Initialize an empty list to hold the input parameters
  var parameters = [];
  //parses/loops through the query string (url)
  for (var param in req.query){
    //Grabs the key of the parameter and the associated value and appends them
    // to the parametes list
    parameters.push({'name':param, 'value':req.query[param]});
  }
  //Cretae a new object to hold the data
  var getObject = {};
  //Set the dataList property of the getObject to parameters list
  getObject.dataList = parameters;
  //Render the page with the get-data view, passing in the getObject
  res.render('get-data', getObject);
});

//The route for the POST request
app.post('/show-data', function(req, res){
  //Initialize the empty lists to hold the input parameters
  var urlParameters = [];
  var bodyParameters = [];

  //parses/loops through the query string (url)
  for (var param in req.query){
    //Grabs the key of the parameter and the associated value and appends them
    // to the parametes list
    urlParameters.push({'name':param, 'value':req.query[param]});
  }
  //parses/loops through body information
  for (var param in req.body){
    bodyParameters.push({'name': param, 'value': req.body[param]})
  }

  //Cretae a new object to hold the data
  var getObject = {};

  //Set the urlData and bodyData properies of the getObject to parameters list
  getObject.urlData = urlParameters;
  getObject.bodyData = bodyParameters;

  //Render the page with the get-data view, passing in the getObject
  res.render('post-data', getObject);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
