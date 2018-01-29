var express = require('express');
var bodyParser= require('body-parser')
var app = express();
var port = 3000;
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://kev:kevkev@ds117868.mlab.com:17868/quotes-crud', (err, database) => {
  if (err) return console.log(err)
  	// console.log(database) 
  db = database.db('quotes-crud');
  db.collection('quotes');
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.listen(port, ()=>{
// 	console.log("app now running on port " + port);
// });