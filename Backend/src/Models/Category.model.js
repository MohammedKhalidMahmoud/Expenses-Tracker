import { sequelize } from './database.js';
import { DataTypes } from 'sequelize';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});


export default Category;