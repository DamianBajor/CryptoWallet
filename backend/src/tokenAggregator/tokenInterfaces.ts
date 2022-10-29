export interface INameOnService {
  location: string;
  name: string;
}

export interface IToken {
  tokenID: string;
  name: string;
  symbol: string;
  price: number;
  nameOnService: INameOnService[];
  preferredServiceUpdate: string;
  lastUpdate: Date;
}
