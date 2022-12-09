// open and express server
const express = require("express");

// create an instant of openAI
const openai = require('openai');
openai.apiKey = process.env.OPENAI_API_KEY;

// create .env configuration file
const dotenv = require("dotenv").config();

// setup the port 
const port = process.env.port || 5000;

// create the express app

const app = express();
app.use('/openai',require('./routes/openAIRoutes'))

app.listen(port, () => console.log(`Hey Masih the app is running on port number ${port}`))

