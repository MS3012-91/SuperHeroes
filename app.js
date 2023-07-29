const express = require('express');
const errorHandlers = require("./middlewares");
const appRouter = require ('./Routers')


app = express();
app.use(express.json())
app.use('/api', appRouter);
//app.use(errorHandlers.errorHandler);

module.exports = app;