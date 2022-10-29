import { catchErrors } from "../handlers/errorHandler";
import * as tokenController from "./tokenController";
import * as userController from "../userAggregator/userController";
import { Router } from "express";

const tokenRouter = Router();

tokenRouter.get(
  "/getAllTokenFromDatabase",
  catchErrors(tokenController.getAllTokenFromDatabase)
);
tokenRouter.post(
  "/addNewTokenToDatabase",
  catchErrors(userController.checkPermission("admin")),
  catchErrors(tokenController.addNewTokenToDatabase)
);

export = tokenRouter;
