import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import sequelize from "./database";
import {ProjectModel} from "./models/ProjectModel";
import {UserModel} from "./models/UserModel";
import {WorkerModel} from "./models/WorkerModel";
import userRouter from "./routes/UserRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', userRouter);


const startServer = async () => {
    try {

        // const results = await UserModel.findAll();

        // await sequelize.sync({force: true})

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

startServer();
