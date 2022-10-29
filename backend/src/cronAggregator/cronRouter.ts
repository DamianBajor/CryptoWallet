import { catchErrors } from "../handlers/errorHandler";
import { Router } from "express";
import * as cronController from "./cronController";
import * as userController from "../userAggregator/userController";

const cronRouter = Router();

cronRouter.get(
    "/cronStopJobs",
    catchErrors(userController.checkPermission("admin")),
    catchErrors(cronController.stopJobs)
);


export = cronRouter;
