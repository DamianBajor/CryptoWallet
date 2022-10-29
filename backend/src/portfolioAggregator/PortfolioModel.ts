import { Schema, model } from "mongoose";
import {
  IPortfolio,
  IDeposit,
  IPortfolioList,
  ITransaction,
  OperationType,
  IPortfolioToken,
} from "./portfolioInterfaces";

const depositSchema = new Schema<IDeposit>(
  {
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { _id: false }
);

const portfolioListSchema = new Schema<IPortfolioList>(
  {
    portfolioID: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { _id: false }
);

const transactionSchema = new Schema<ITransaction>(
  {
    transactionID: {
      type: String,
    },
    operationType: {
      type: String,
      enum: OperationType,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    fee: {
      type: Number,
    },
    spent: {
      type: Number,
    },
    date: {
      type: Date,
    },
  },
  { _id: false }
);

const portfolioTokenSchema = new Schema<IPortfolioToken>(
  {
    tokenID: {
      type: String,
    },
    portfolioID: {
      type: String,
    },
    amount: {
      type: Number,
    },
    transactions: {
      type: [transactionSchema],
    },
  },
  { _id: false }
);

const portfolioSchema = new Schema<IPortfolio>({
  userID: {
    type: String,
    unique: true,
    required: true,
  },
  deposit: {
    type: [depositSchema],
  },
  portfolioList: {
    type: [portfolioListSchema],
    required: true,
  },
  tokens: {
    type: [portfolioTokenSchema],
  },
});

export const PortfolioModel = model("Portfolio", portfolioSchema);
