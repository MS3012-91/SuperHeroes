"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Hero.belongsToMany(models.Power, {
        through: "HeroPowers",
        foreignKey: "heroId",
      });
    }
  }
  Hero.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      realName: DataTypes.STRING,
      originDescription: DataTypes.STRING,
      catchPhrase: DataTypes.STRING,
      image: DataTypes.STRING,
      isGood: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Hero",
      tableName: "heroes",
      underscored: true,
    }
  );
  return Hero;
};
