var mongoose = require('mongoose')

var apartmentSchema = new mongoose.Schema({
  address: { type: String, default: "123 4th Street"},
  city: { type: String, default: "Boca Raton"},
  state: { type: String, default: "FL"},
  zip: { type: String, default: "33434"},
  rent: { type: Number, default: 1400 },
  sqft: { type: Number, default: 900 },
  beds: { type: Number, default: 2 },
  baths: { type: Number, default: 2 },
  floor: { type: Number, default: 1 },
  img: { data: Buffer, contentType: String }
})

module.exports = mongoose.model('Apartment', apartmentSchema)
