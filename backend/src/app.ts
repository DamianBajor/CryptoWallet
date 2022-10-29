import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as errorHandlers from "./handlers/errorHandler";
import tokenRouter from "./tokenAggregator/tokenRouter";
import coingeckoRouter from "./coingeckoAggregator/coingeckoRouter";
import portfolioRouter from "./portfolioAggregator/portfolioRouter";
import { isLogged } from "./userAggregator/sessionController";
import userRouter from "./userAggregator/userRouter";
import {initJobs} from "./cronAggregator/cronController"
import cronRouter from "./cronAggregator/cronRouter";

const app = express();
initJobs();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/token", isLogged, tokenRouter);
app.use("/coingecko", coingeckoRouter);
app.use("/portfolio", isLogged, portfolioRouter);
app.use("/cron", isLogged, cronRouter)

app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler)

export const App = app;
