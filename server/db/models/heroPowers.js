"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HeroPowers extends Model {
    static associate(models) {}
  }
  HeroPowers.init(
    {
      heroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Hero",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      powerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Power",
          key: "id",
        },
        onDelete: "restrict",
        onUpdate: "cascade",
        allowNull: false,
      },
      origin: DataTypes.STRING,
    },

    {
      sequelize,
      modelName: "HeroPowers",
      underscored: true,
      tableName: "hero_powers",
    }
  );
  return HeroPowers;
};
