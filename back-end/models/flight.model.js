//schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flighSchema = new Schema({
    
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    currentPassengers: {
        type: Number,
        required: true
    },
    passengerLimit: {
        type: Number,
        min: [0, 'Passenger cannot be 0'],
        max: [45, 'Passenger cannot more than 45'],
        required: true
    }
});

// Model Name | Schema Object | Collection Name in Atlas
const Flight = mongoose.model('Flight', flighSchema, 'Flights');
module.exports = Flight;

