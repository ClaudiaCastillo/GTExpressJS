var express = require('express');
var videogames = require('./videogames');
var app = express();

//Middleware
/*
Middleware functions are functions that
have access to the request object (req), the response object (res),
and the next middleware function in the application’s request-response
cycle. These functions are used to modify req and res objects for
tasks like parsing request bodies, adding response headers, etc.
 */
app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());

   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
   //function/route handler.
   next();
});

/*
To restrict it to a specific route (and all its subroutes), provide that route as the first argument of app.use()
*/
app.use('/whoa', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get('/why',function(req,res){
  res.json(videogames);
});


app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});



app.listen(3000);
