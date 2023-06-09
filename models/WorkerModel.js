import sequelize from '../database.js';
import {DataTypes} from 'sequelize';

export const WorkerModel = sequelize.define('workers', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    projectsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    totalSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
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