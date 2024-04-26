'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsToMany(models.Book, {
        through: 'Loan',
        unique: false
      })
    }
  }
  Member.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
    hooks: {
      beforeCreate: function (Member, op, fn){
        Member.password = hashPassword(Member.password)
      }
    }
  });
  return Member;
};