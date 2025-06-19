const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    profilePhoto: String,
  username: { type: String, unique: true },
  password: String,
  profession: String,
  companyName: String,
  addressLine1: String,
  country: String,
  state: String,
  city: String,
  subscriptionPlan: String,
  newsletter: Boolean,
  gender: String,
  dob: Date,
}, {
    timestamps: true,
    });

const countrySchema = mongoose.Schema({
    name:String,
})

const stateSchema = mongoose.Schema({
    name:String,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
})
const citySchema = mongoose.Schema({
    name:String,
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
    },
})
const User = mongoose.model('User', userSchema);
const Country = mongoose.model('Country', countrySchema);
const State = mongoose.model('State', stateSchema);
const City = mongoose.model('City', citySchema);

module.exports = { User, Country, State, City };