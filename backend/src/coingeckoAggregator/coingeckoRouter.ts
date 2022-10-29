import { catchErrors } from "../handlers/errorHandler";
import * as coingeckoController from "./coingeckoController";
import { Router } from "express";

const coingeckoRouter = Router();

coingeckoRouter.get(
  "/getAllTokenByNameFromCoingecko",
  catchErrors(coingeckoController.getAllTokenByNameFromCoingecko)
);

export = coingeckoRouter;
