const express = require('express');
const app = express();
const cors = require('cors');
const indexRouter = require('./routes/index.route');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/db');
require('path');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Origin', 'X-Requested-With', 'Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors());

const PORT = process.env.PORT || 5000;

// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 1000000 }));

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log('node js started at ' + PORT)
})

module.exports = app;

