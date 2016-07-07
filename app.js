var app = require('express')();
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3333");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var file = './data-dev.json';

app.get('/products', function (req, res) {
  res.json(getProducts());
});

app.post('/products', function (req, res) {
  var product_name = req.body.name;
  console.log(product_name);
  var result = createProduct(product_name);
  result ?
    res.status(201).send("Agregado el nuevo producto") :
    res.status(400).send("Nombre invalido");
});

var getProducts = function() {
  return jsonfile.readFileSync(file);
}

var createProduct = function(product_name) {
  var db_actual = jsonfile.readFileSync(file);
  if (product_name === undefined || product_name === "") return false;
  var db_new = db_actual.concat([product_name]);
  jsonfile.writeFileSync(file, db_new, {spaces: 2});
  return true;
}

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
