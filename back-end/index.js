const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const router = require('./routes/flight.route')
const cors = require('cors');
const bodyparser = require("body-parser");
require('dotenv').config(); //one and done


const app = express();
const PORT = process.env.PORT || 8080; //default to 8080 if not in .env

// middleware that auto parses JSON
app.use(express.json());
app.use(cors());
app.use(logger);

// flight route - this binds a router object to the url 
app.use('/', router)


app.use(bodyparser.urlencoded({
    extended:true
}))

//register route
app.use('/api',require("./routes/register.route.js"))


app.all('*', (req, res) => {
    res.status(404).send('We don\'t have the resource you\'re looking for.');
});

mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
        // Options
        // Connect to fallback database
        // OR
        // Terminate process
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

