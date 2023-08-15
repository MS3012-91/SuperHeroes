const { Router } = require("express");
const { heroesController } = require("../Controllers");
const { upload } = require("../middlewares");

const heroesRouter = Router();

heroesRouter
  .route("/")
  .post(upload.uploadHeroFile, heroesController.creteHero) 
  .get(heroesController.getHeroes);

heroesRouter
  .route("/:heroId")
  .patch(heroesController.updateHero)
  .delete(heroesController.deleteHero);
module.exports = heroesRouter;
