import sequelize from '../database.js';
import {DataTypes} from 'sequelize';

export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.TEXT,
    },
    token: {
        type: DataTypes.TEXT,
        unique: true
    },
    createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE
    }
});