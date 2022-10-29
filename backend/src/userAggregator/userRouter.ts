import { catchErrors } from "../handlers/errorHandler";
import * as userController from "../userAggregator/userController";
import { Router } from "express";
import * as sessionController from "./sessionController";
import * as portfolioController from "../portfolioAggregator/portfolioController";

const userRouter = Router();

userRouter.post(
  "/login",
  catchErrors(userController.login),
  catchErrors(sessionController.createSession)
);

userRouter.post(
  "/register",
  catchErrors(userController.register),
  catchErrors(portfolioController.createFirstPortfolio)
);

export = userRouter;
