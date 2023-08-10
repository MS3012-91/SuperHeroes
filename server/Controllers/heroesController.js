const createHttpError = require('http-errors');
const _ = require('lodash');
const path = require('path');
const { Hero } = require('../db/models/');
const { IMAGES_FOLDER } = require("./../constants");

module.exports.creteHero = async (req, res, next) => {
  const { body, file } = req;
  console.log("body", body);
      if (file) {
        body.image = path.join(IMAGES_FOLDER, file.filename);
        console.log("body.image", body.image); //images\heroPhoto-1691693785590
      }
    try {
      const createdHero = await Hero.create(body);
        if (!createdHero) {
            return next (createHttpError(500, 'Server Error'))
        }
        const prerapedHero = _.omit(createdHero.get(), ['createdAt', 'updatedAt'])
        res.status(201).send({ data: prerapedHero });
    }
    catch (err) {
        next(err)
    }
}

module.exports.getHeroes = async (req, res, next) => {
    try { 
        const foundHeroes = await Hero.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.status(200).send({data:foundHeroes})
    }
        catch (err) {
            next (err)
        }
    }
module.exports.updateHero = async (req, res, next) => {
  const {
    body,
    params: { heroId },
  } = req;

  try {
    const [updatedHeroCount, [updatedHero]] = await Hero.update(body, {
      where: {
        id: heroId,
      },
      raw: true,
      returning: true,
    });

    if (!updatedHeroCount) {
      return next(createError(404, "Hero Not Found"));
    }
    res.status(200).send({ data: updatedHero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHero = async (req, res, next) => {
  const {
    params: { heroId },
  } = req;

  try {
    const deletedHeroCount = await Hero.destroy({
      where: {
        id: heroId,
      },
    });

    if (!deletedHeroCount) {
      return next(createError(404, "Hero Not Found"));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


