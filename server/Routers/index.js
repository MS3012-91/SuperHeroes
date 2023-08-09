const { Router } = require('express');
const heroesRouter = require('./heroesRouter')
const powersRouter = require('./powersRouter');

const appRouter = Router();
appRouter.use("/powers", powersRouter);
appRouter.use("/heroes", heroesRouter);

module.exports = appRouter;