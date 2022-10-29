import { PortfolioModel } from "./PortfolioModel";
import * as uuid from "innodb-optimized-uuid";
import * as validator from "express-validator";
import { IPortfolioToken, ITransaction } from "./portfolioInterfaces";

export const createFirstPortfolio = async (req, res) => {
  const userID = req.user;
  const portfolioID = uuid.generate();

  const firstPortfolio = new PortfolioModel({
    userID,
    portfoliosList: [{ portfolioID, name: "Port 1" }],
  });

  await firstPortfolio.save();
  res.status(200).json({ message: "OK" });
};

export const getPortfolioTokens = async (req, res) => {
  validator.query(req.query);

  const portfolioID = req.query.portfolioID;
  const userID = req.user;

  const portfolioCoins = await PortfolioModel.findOne(
    {
      userID,
      "tokens.portfolioID": { $eq: portfolioID },
    },
    {
      tokens: {
        $elemMatch: {
          portfolioID,
        },
      },
    }
  );

  if (!portfolioCoins) {
    res.status(200).json({ message: "No tokens in portfolio" });
    return;
  }
  res.status(200).json(portfolioCoins);
};

export const addNewTokenToPortfolio = async (req, res) => {
  validator.body(req.body);
  const userID = req.user;
  const {
    tokenID,
    portfolioID,
    amount,
    operationType,
    price,
    fee,
    spent,
    date,
  } = req.body;

  const portfolio = await PortfolioModel.findOne({
    userID,
    portfolioID,
  });

  const transactionID = uuid.generate();

  const newToken: IPortfolioToken = {
    tokenID,
    portfolioID,
    amount,
    transactions: [
      {
        transactionID,
        operationType,
        price,
        amount,
        fee,
        spent,
        date,
      },
    ],
  };

  portfolio.tokens.push(newToken);
  await portfolio.save();
  res.status(200).json({ message: "OK" });
  return;
};

export const addTokenToPortfolio = async (req, res, next) => {
  validator.body(req.body);
  const userID = req.user;
  const {
    tokenID,
    portfolioID,
    amount,
    operationType,
    price,
    fee,
    spent,
    date,
  } = req.body;

  const portfolio = await PortfolioModel.findOne(
    {
      userID,
      tokens: {
        $elemMatch: {
          tokenID,
          portfolioID,
        },
      },
    },
    {
      tokens: {
        $elemMatch: {
          tokenID,
          portfolioID,
        },
      },
    }
  );

  if (!portfolio) {
    next();
    return;
  }

  const newTokenAmount = portfolio.tokens[0].amount + amount;
  const transactionID = uuid.generate();
  const newTransaction: ITransaction = {
    transactionID,
    operationType,
    price,
    amount,
    fee,
    spent,
    date,
  };

  await PortfolioModel.updateOne(
    {
      userID,
      tokens: {
        $elemMatch: {
          tokenID,
          portfolioID,
        },
      },
    },
    {
      $set: {
        "tokens.$.amount": newTokenAmount,
      },
      $push: {
        "tokens.$.transactions": newTransaction,
      },
    }
  );

  res.status(200).json({ message: "OK" });
};
