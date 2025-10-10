import { sequelize } from './database.js';
import { DataTypes } from 'sequelize';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    
    type: {
        type: DataTypes.ENUM('global', 'custom'),
        allowNull: false,
        defaultValue: 'global',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        reference: {
            model: 'User', // name of Target model
            key: 'id' // key in Target model that we're referencing
        }
    },
}, {
    timestamps: true,
    freezeTableName: true,
});


export default Category;