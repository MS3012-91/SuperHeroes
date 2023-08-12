const path = require("path");
const express = require("express");
const cors = require("cors");
const { errorHandlers } = require("./middlewares");
const appRouter = require("./Routers");
const { STATIC_FOLDER } = require("./constants");

app = express();

app.use(cors({ origin: "*" }));

app.use(express.static(path.resolve(STATIC_FOLDER)));
// console.log('path.resolve(STATIC_FOLDER)', path.resolve(STATIC_FOLDER))
// app.use(express.static(__dirname + "\\" + STATIC_FOLDER));
// console.log("__dirname + STATIC_FOLDER", __dirname + "\\"+ STATIC_FOLDER);
app.use(express.json());

app.use("/api", appRouter);

app.use(errorHandlers.errorHandler);

module.exports = app;
