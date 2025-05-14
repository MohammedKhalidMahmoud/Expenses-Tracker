// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
// const { sequelize } = require('./index.js');
// const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
},{
    freezeTableName: true,
    timestamps: false,
  }
  
);

export default User;



// , {
//   hooks: {
//     beforeCreate: async (user) => {
//       user.password = await bcrypt.hash(user.password, 10);
//     }
//   }
// }