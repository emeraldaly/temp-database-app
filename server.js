var express = require('express');
var app = express();
var PORT = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mysql = require('mysql');
var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'temp_db'
})

app.get("/", function(req, res){
  connection.query("SELECT * FROM feel_states", function(err, col){
    if (err) throw err;
    console.log('The solution is: ', col);

    res.render('index', {col});
  });
});

app.post("/createHot", function(req, res){
  connection.query("INSERT INTO feel_states (state) VALUES (?)", ['Too Hot'], function(err, result){
    if (err) throw err;
  });
  res.redirect("/");
})

app.post("/createCold", function(req, res){
  connection.query("INSERT INTO feel_states (state) VALUES (?)", ['Too Cold'], function(err, result){
    if (err) throw err;
  });
  res.redirect("/");
})

app.post("/createRight", function(req, res){
  connection.query("INSERT INTO feel_states (state) VALUES (?)", ['Just Right'], function(err, result){
    if (err) throw err;
  });
  res.redirect("/");
})

app.listen(PORT, function(){
  console.log("running on port %s", PORT);
});