import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  date:{
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
      model: 'Category', // name of Target model
      key: 'id' // key in Target model that we're referencing
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
      model: 'User', // name of Target model
      key: 'id' // key in Target model that we're referencing
    }
  }
}, {
  freezeTableName: true,
  timestamps: true,
  
});

export default Expense;