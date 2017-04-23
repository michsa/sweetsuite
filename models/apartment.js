var mongoose = require('mongoose');

const set = (type, val) => {
return {type: type, default: val}
}

var apartmentSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zip: String,
  rent: Number,
  square_feet: Number,
  date_listed: Date,
  owner_id: Number,
  bedrooms: Number,
  bathrooms: Number,
  floor: Number /*,
  pets: {
    small_dogs: set(Boolean, false),
    large_dogs: set(Boolean, false),
    cats: set(Boolean, false),
    other: set(Boolean, false)
  },
  utilities: {
    water: set(Boolean, false),
    heating: set(Boolean, false),
    cooling: set(Boolean, false)
  },
  appliances: {
    dishwasher: set(Boolean, false),
    garbage_disposal: set(Boolean, false),
    microwave: set(Boolean, false),
    oven: set(Boolean, false),
    refrigerator: set(Boolean, false),
    washer: set(Boolean, false),
    dryer: set(Boolean, false)
  },
  description: String,
  built: Number
*/
})

module.exports = mongoose.model('Apartment', apartmentSchema);
