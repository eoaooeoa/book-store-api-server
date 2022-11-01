import cors from "cors";
import express from "express";
import { viewsRouter, userRouter } from "./routers";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(viewsRouter);

app.use("/api/users", userRouter);

app.use(errorHandler);

export { app };
