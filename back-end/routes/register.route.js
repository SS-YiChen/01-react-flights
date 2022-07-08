const express = require("express");
const router = express.Router();
const validator = require('validator'); //validator.js
const isEmpty = require('lodash/isEmpty'); //lodash.js: if value is empty, return true;

const validatorInput = (data) => {
    // validator.isEmpty to valid 
    const errors = {};

    if(!validator.isEmail(data.email)){
        if(isEmpty(data.email)){
            errors.email = "Email cannot be empty"
        }else {
            errors.email = "Email is illegal"
        }
    }
    if(validator.isEmpty(data.username)){
        errors.username = "Username cannot be empty"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password cannot be empty"
    }
    if(validator.isEmpty(data.phone)){
        errors.phone = "phone cannot be empty"
    }

    // equals  
    if(!validator.equals(data.password, data.passwordComfirmation)){
        errors.passwordComfirmation = "Comfirmation does Not match"
    }

    return {
        isValid:!isEmpty(errors),
        errors
    }
}

router.post("/register", (req,res) => {

    const {isValid, errors} = validatorInput(req.body);

    if(isValid){
        // fail
        res.status(400).json(errors)
    }else{
        // success
        res.send({
            msg:"success!"
        })
    }
})

module.exports = router;