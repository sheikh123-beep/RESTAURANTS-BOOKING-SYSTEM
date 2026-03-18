import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
dotenv.config({path: "./config/config.env"});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: process.env.FRONTED_URL,
    methods: ["POST"],
    credentials: true,
  })
);
app.use("/api/v1/reservation", reservationRouter);
dbConnection();


app.use(errorMiddleware);
export default app;