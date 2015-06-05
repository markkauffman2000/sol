var mongoose = require( "mongoose" ); // mongoose for mongodb
var database = require( "./app/config/database" ); // load the database config

mongoose.connect( database.url ); // connect to mongoDB database

var express = require( "express" );
var morgan = require( "morgan" ); // log requests to the console (express4)
var bodyParser = require( "body-parser" ); // pull information from HTML POST (express4)
var methodOverride = require( "method-override" ); // simulate DELETE and PUT (express4)

var app = express(); // create our app w/ express

app.use( morgan( "dev" ) ); // log every request to the console
app.use( express.static( __dirname + "/public" ) ); // set the static files location /public/image will be /image for users
app.use( bodyParser.urlencoded( { "extended" : "true" } ) ); // parse application/x-www-form-urlencoded
app.use( bodyParser.json() ); // parse application/json
app.use( bodyParser.json( { type : "application/vnd.api+json" } ) ); // parse application/vnd.api+json as json
app.use( methodOverride() );

require( "./app/routes/routes" )( app );

// var port = 8888;
var port = process.env.PORT;
app.listen( port );
console.log( "Bookstore app listening on port " + port );
