import { catchErrors } from "../handlers/errorHandler";
import { Router } from "express";
import * as portfolioController from "./portfolioController";
const portfolioRouter = Router();

portfolioRouter.get(
  "/getPortfolioTokens",
  catchErrors(portfolioController.getPortfolioTokens)
);

portfolioRouter.post(
  "/addTokenToPortfolio",
  catchErrors(portfolioController.addTokenToPortfolio),
  catchErrors(portfolioController.addNewTokenToPortfolio)
);
export = portfolioRouter;
