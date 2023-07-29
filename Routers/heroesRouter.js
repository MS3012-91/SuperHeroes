const { Router } = require('express');
const { heroesController } = require('../Controllers');

const heroesRouter = Router();

heroesRouter
  .route("/")
  .post(heroesController.creteHero)
  .get(heroesController.getHeroes);
  
heroesRouter
  .route("/:heroId")
  .patch(heroesController.updateHero)
  .delete(heroesController.deleteHero);
module.exports = heroesRouter;