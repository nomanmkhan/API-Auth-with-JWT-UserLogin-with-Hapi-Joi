const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

// DB Connection 
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to DB'));

//Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => console.log("Server Started on: 3000"));