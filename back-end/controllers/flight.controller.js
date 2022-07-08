const Flight = require('../models/flight.model');

// add new flight
const createFlight = async ({flightNumber, departureDate, arrivalDate, departureTime, 
    arrivalTime, departureAirport, arrivalAirport, currentPassengers, passengerLimit }) => {
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currentPassengers,
            passengerLimit
        }); // This alone does not save to the database, this just simply prepares for the database
        await flight.save(); // Saves the newly created movie to the database

        return flight._id; // Return the id of the newly created. Could also return the entire object
    }
    // This catch will occur if any of the values are up to standard
    catch (err) {
        console.error(err);
        throw { status: 400, message: err };
    }
}


// view all flights
const findAllFlights = async (limit = 0) => {
    const flight = await Flight.find(); 
    return flight;
}

// update a flight
const updateFlight = async ({ 
        flightNumber, 
        departureDate, 
        arrivalDate, 
        departureTime, 
        arrivalTime, 
        departureAirport, 
        arrivalAirport, 
        currentPassengers, 
        passengerLimit }) => {
    try {
        const updates = {
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currentPassengers,
            passengerLimit
        };
        const updatedFlight = await Flight.findOneAndUpdate({ flightNumber } , updates, { new: true });
        return updatedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

// delete a flight
const deleteFlight = async flightNumber => {
    try {
        const deletedFlight = await Flight.deleteOne({ flightNumber });
        return deletedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

//find by id
const findFlightById = async flightNumber => {
    try {
        const findFlight = await Flight.find({flightNumber});
        if (findFlight == null) {
            throw `No flight with the id of ${flightNumber} found.`;
        }
        return findFlight;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err};
    }
}

module.exports = { createFlight, findAllFlights, updateFlight, deleteFlight, findFlightById};