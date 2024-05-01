'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.hasMany(models.Book)
    }
  }
  Author.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email tidak valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255] // Memastikan password terdiri dari minimal 8 karakter
      }
    },
    sale: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0 // Memastikan sale selalu positif
      }
    }
  }, {
    sequelize,
    modelName: 'Author',
    hooks: {
      beforeCreate: function (Author, op ,fn) {
        Author.password = hashPassword(Author.password)
      }
    }
  });
  return Author;
};