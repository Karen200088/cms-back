import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import YAML from 'yamljs';
import sequelize from "./database.js";

import swaggerUi from "swagger-ui-express";
const swaggerDocument = YAML.load('./swagger.yaml');

import userRouter from "./routes/UserRoutes.js";
import projectRouter from "./routes/ProjectRoutes.js";
import workerRouter from "./routes/WorkerRoutes.js";
import {UserModel} from "./models/UserModel.js";
import {ProjectModel} from "./models/ProjectModel.js";
import {WorkerModel} from "./models/WorkerModel.js";
import {Worker_Project} from "./models/index.js";
import ApiErrorHandler from "./helpers/ApiErrorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

app.use('/api', userRouter);
app.use('/api', workerRouter);
app.use('/api', projectRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {

  try {

    // await sequelize.sync({force: true});

    await sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });

    app.listen(process.env.PORT || 5001, () => {
      console.log(`app started on port ${process.env.PORT || 5001}`)
    });
  } catch (error) {
    return ApiErrorHandler.badRequest(404, "Something went wrong");
  }
}

startServer();

