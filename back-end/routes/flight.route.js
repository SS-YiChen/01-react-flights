const router = require('express').Router();
const { findAllFlights, createFlight, updateFlight, deleteFlight, findFlightById } = require('../controllers/flight.controller');

//view all flights
router.get('/view', async(req,res) => {
    const flights = await findAllFlights();
    res.json(flights);
})

// create an new flight
router.post('/add', async (req,res) => {
    try {
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
})

// delete flight
router.delete('/del/:flightNumber', async (req, res) => {
    try {
        const deletedFlight = await deleteFlight(req.params.flightNumber);
        res.status(201).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

//update flight
router.post('/upd', async (req, res) => {
    try {
        const updatedFlight = await updateFlight(req.body);
        res.status(201).json({ updatedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

//find by id
router.get('/view/:flightNumber', async (req, res) => {
    try {
        const findFlight = await findFlightById(req.params.flightNumber);
        res.json(findFlight);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;