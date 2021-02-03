// VALIDATION
const Joi = require('@hapi/joi');

// Regiter Validation 
const registerValidation = data => {

    const schema = Joi.object({
        name: Joi.string().min(5)/*.required()*/,
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });

    // validate before making user 
    return schema.validate(data);
}

// Login Validation 
const loginValidation = data => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });

    // validate before making user 
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;