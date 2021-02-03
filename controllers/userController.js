const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// Register 
const registerUser = async (req, res) => {

    // validate before making user 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // is Email exist 
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // passport.use('signup', new localStrategy(
    //     {
    //         usernameField: 'email',
    //         passwordField: 'password'
    //     },
    //     async (email, password, done) => {
    //         try{
    //             const user = await User.create({email,password});
    //             return done(null, user);

    //         }catch(err){
    //             done(err);
    //         }
    //     }
    // ));

    


    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id, name:user.name});
    }catch(err){
        res.status(400).send(err);   
    }
}


// LOGIN 

const loginUser = async (req, res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    // is Email exist 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is incorrect');

    // CHECKING PASSWORD 

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    // Create and Assign Token 
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send('Logged In Successfully!');

}

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
