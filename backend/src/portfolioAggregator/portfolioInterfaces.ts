export enum OperationType {
  Buy = "BUY",
  Sell = "SELL",
  Transfer = "TRANSFER",
}

export interface IPortfolioList {
  portfolioID: string;
  name: string;
}

export interface ITransaction {
  transactionID: string;
  operationType: string;
  price: number;
  amount: number;
  fee: number;
  spent: number;
  date: Date;
}

export interface IPortfolioToken {
  tokenID: string;
  portfolioID: string;
  amount: number;
  transactions: ITransaction[];
}

export interface IDeposit {
  amount: number;
  currency: string;
  date: Date;
}

export interface IPortfolio {
  userID: string;
  deposit: IDeposit[];
  portfolioList: IPortfolioList[];
  tokens: IPortfolioToken[];
}
