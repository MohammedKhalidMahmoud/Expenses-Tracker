import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT
  },userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // name of Target model
      key: 'id' // key in Target model that we're referencing
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
  
});

export default Expense;