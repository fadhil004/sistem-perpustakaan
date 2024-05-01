'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Author)
      Book.belongsToMany(models.Member, {
        through: 'Loan',
        unique: false
      })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genre: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
    hooks: {
      beforeCreate: async function (book, op) {
        try {
          const foundAuthor = await sequelize.models.Author.findOne({
            where: {
              name: book.author
            }
          });
          if (foundAuthor) {
            book.AuthorId = foundAuthor.id;
          } else {
            throw new Error('Author not found');
          }
        } catch (error) {
          console.error('Error in beforeCreate hook:', error);
          throw error; 
        }
      }
    }
  });
  return Book;
};