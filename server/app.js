const express = require('express');
const cors = require('cors');
const {errorHandlers} = require("./middlewares");
const appRouter = require('./Routers');
const { STATIC_FOLDER } = require('./constants');


app = express();

app.use (cors({origin: '*'}))

app.use(express.static(__dirname + STATIC_FOLDER));

app.use(express.json());

app.use('/api', appRouter);

app.use(errorHandlers.errorHandler);

module.exports = app;