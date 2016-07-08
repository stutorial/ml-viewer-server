var app = require('express')();
var bodyParser = require('body-parser');
var db = require('diskdb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3333");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

db.connect('./db', ['products']);

app.get('/products', function (req, res) {
  var products = getProducts();
  res.status(200).json(products);
});

app.post('/products', function (req, res) {
  var product_name = req.body.name;
  console.log(product_name);

  var result = createProduct(product_name);

  result ?
    res.status(201).send(result) :
    res.status(400).send("Nombre invalido");
});

app.delete("/products/:id", function(req, res) {
  var id = req.params.id;

  var result = deleteProduct(id);

  res.status(200).send(result);
});

var getProducts = function() {
  return db.products.find();
}

var createProduct = function(product_name) {
  if (product_name === undefined || product_name === "") return false;
  return db.products.save({ name: product_name });
}

var deleteProduct = function(id) {
  return db.products.remove({ _id: id }, false);
}

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
