// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';
// const { sequelize } = require('./index.js');
// const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
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
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
},{
    freezeTableName: true,
    timestamps: true,
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