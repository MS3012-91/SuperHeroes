const { Router } = require("express");
const { powersController } = require('../Controllers');


const powersRouter = Router();

powersRouter.route('/')
    .get(powersController.getPowers);

module.exports = powersRouter;
