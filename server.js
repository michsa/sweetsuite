var path = require('path')
var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

var config = require('./webpack.config')
var mongoConfig = require('./config')

//var async = require('async')
//var request = require('request')
//var xml2js = require('xml2js')
//var compiler = webpack(config)


var Apartment = require('./models/apartment')
var mongoose = require('mongoose')

mongoose.connect(mongoConfig.database)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/text
app.use(bodyParser.text())

app.use(webpackMiddleware(webpack(config)))
app.use(webpackHotMiddleware(webpack(config)))


app.post('/create', function(req, res, next) {
  
  var values = req.body
  console.log(values)

  var apartment = new Apartment({
    address: values.address,
    city: values.city,
    state: values.state,
    zip: values.zip,
    rent: values.rent,
    square_feet: values.sqft,
    date_listed: values.date_listed,
    owner_id: values.owner_id,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    floor: 4
  })

  apartment.save(function(err) {
    if (err) {
      console.log("err: " + err)
      res.send({message: address + ' add failed' })
    }
    //apartment.address = "666 dick street"
    //apartment.save()
    res.send({ message: address + ' has been added successfully!' })
  })
})


app.get('/apartments', function(req, res, next) {
  Apartment.find(function (err, apts) {
    if (err) return console.error(err)
    console.log(apts)
    res.json(apts)
  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
