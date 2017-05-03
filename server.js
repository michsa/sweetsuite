var path = require('path')
var fs = require('fs')
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
var User = require('./models/user')
var mongoose = require('mongoose')

mongoose.connect(mongoConfig.database)

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'image/png', limit: '500mb'}))
app.use(bodyParser.raw({type: 'image/jpeg', limit: '500mb'}))
// parse application/text
//app.use(bodyParser.text())

app.use(webpackMiddleware(webpack(config)))
app.use(webpackHotMiddleware(webpack(config)))


app.post('/create/:id/:i', function(req, res, next) {
  
  var img = req.body
  var type = req.get('Content-Type')
  
  var dir = './app/img/' + req.params.id
  var path = dir + '/' + req.params.i
  
  fs.writeFile(path, img, 'binary', function(err) {
    if (err) throw err
    else {
      res.send({ success: true, path: path })
    }
  })

})


app.post('/create', function(req, res, next) {
  
  var values = req.body
  console.log("-----------\nCREATE LISTING\n-----------")
  console.log(req.get('Content-Type'))
  console.log(values)

  var apartment = new Apartment({
    address: values.address,
    city: values.city,
    state: values.state,
    zip: values.zip, 
    rent: values.rent,
    sqft: values.sqft,
    beds: values.beds,
    baths: values.baths,
    floor: values.floor,
    imgct: values.imgct
  })

  apartment.save(function(err, apt) {
    if (err) {
      console.log("err: " + err)
      res.send({success: false, error: err })
    }
    else {
      var dir = path.join("./app/img/", apt._id.toString())
      fs.mkdir(dir, 0744, function(err) {
        if (err && err.code != 'EEXIST') throw err
        else {
          console.log(dir)
          res.send({ success: true, id: apt._id })
        }
      })
    }
  })
})


app.post('/register', function(req, res, next) {  

  var values = req.body  
  console.log(values)
  
  User.find({email: values.email}, function(err, user) {
      if (user.length > 0){
          console.log("err: email already exists")
      }
      else {
          console.log("email not taken")
          console.log(User.find({email: values.email}, {_id: 1}).length)
          var user = new User({  
            name: {
              first: values.first,  
              last: values.last
            },
            email: values.email,  
            pw: values.pw   
          })

          user.save(function(err) {  
            if (err) {  
              console.log("err: " + err)  
              res.send({message: 'add failed' })  
            }  
            res.send({ message: 'account has been created successfully!' })  
          })
      }
  })
})


app.post('/login', function(req, res, next) {  
  var values = req.body  
  // console.log(values)  
  
  User.findOne({email: values.email}, function (err, user) {  
    if (err) return console.error(err)
    console.log("USER:")
    console.log(user)
    user.comparePassword(values.pw, function(err, isMatch) {  
      if (err) throw err;  
      console.log("user valid")
      return res.json({id: user._id, name: user.name.first})
    })
  })
}) 


app.get('/apartments', function(req, res, next) {
  Apartment.find({imgct: {$gt: 0}}, (err, apts) => {
    if (err) return console.error(err)
    else res.json(apts)
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
