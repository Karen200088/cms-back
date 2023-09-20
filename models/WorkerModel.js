import sequelize from '../database.js';
import {DataTypes} from 'sequelize';

export const WorkerModel = sequelize.define('workers', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {isEmail: true},
  },
  mentor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mentorPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  techInterviewer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  techInterviewerPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  caller: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  callerPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hrManager: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hrManagerPercent: {
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