import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import sequelize from "./database.js";
import userRouter from "./routes/UserRoutes.js";
import workerRouter from "./routes/WorkerRoutes.js";
import {UserModel} from "./models/UserModel.js";
import {ProjectModel} from "./models/ProjectModel.js";
import {WorkerModel} from "./models/WorkerModel.js";
// import Worker_Project from "./models/WorkerProjectModel.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', workerRouter);


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
        })
    } catch (error) {
        console.log(error);
    }
}

await startServer();

