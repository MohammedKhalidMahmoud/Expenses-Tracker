const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
// const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;


// , {
//   hooks: {
//     beforeCreate: async (user) => {
//       user.password = await bcrypt.hash(user.password, 10);
//     }
//   }
// }