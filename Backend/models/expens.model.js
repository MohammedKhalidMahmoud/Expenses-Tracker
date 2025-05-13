import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const Expense = sequelize.define('Expense', {
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
  }
}, {
  freezeTableName: true,
  timestamps: false,
  
});
