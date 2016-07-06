var express = require('express');
var app = express();

var products = ["HyperX Cloud 2", "Geforce 1080"];

app.get('/products', function (req, res) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods'
    , 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers'
    , 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.json(products);
});

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
