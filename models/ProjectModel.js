import sequelize from "../database.js"
import {DataTypes} from 'sequelize';

export const ProjectModel = sequelize.define('projects', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
  },
  projectStatus: {
    type: DataTypes.STRING,
  },
  projectPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  taxPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  officePercent: {
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