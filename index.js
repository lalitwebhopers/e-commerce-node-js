const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()
const routes = require('./src/routes/_routes')

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(routes);

app.listen(4000);