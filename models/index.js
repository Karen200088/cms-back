import sequelize from "../database.js";
import {DataTypes} from "sequelize";
import {ProjectModel} from "./ProjectModel.js";
import {WorkerModel} from "./WorkerModel.js";

const Worker_Project = sequelize.define('workers_project', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
});

WorkerModel.belongsToMany(ProjectModel, {
  through: "workers_projects",
  foreignKey: "projectId",
});

ProjectModel.belongsToMany(WorkerModel, {
  through: "workers_projects",
  foreignKey: "workerId",
});

export default Worker_Project;