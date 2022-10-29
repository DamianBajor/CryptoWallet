import { TokenModel } from "./TokenModel";
import * as validator from "express-validator";
import * as uuid from "innodb-optimized-uuid";
import dayjs from 'dayjs';
import { getTokenPriceFromCoingecko } from "../coingeckoAggregator/coingeckoController";

const getPriceByService = async (preferredService, tokenNameOnPreferredService) => {
  switch (preferredService) {
    case 'coingecko':
      return await getTokenPriceFromCoingecko(tokenNameOnPreferredService);
    case 'binance':
    default:
      throw new Error('No preferred service');
  }
}

export const addNewTokenToDatabase = async (req, res) => {
  validator.body(req.body);

  const { name, symbol, serviceName, preferredServiceUpdate } = req.body;
  const tokenExist = await TokenModel.findOne({ name }, " -_id");

  if(tokenExist){
    res.status(400).json({ message: "Token exist in database" });
    return;
  }

  const price = await getPriceByService(preferredServiceUpdate, serviceName);

  const nameOnService = [
    {
      location: "coingecko",
      name: serviceName.coingecko?serviceName.coingecko:"",
    },
    {
      location: "binance",
      name: serviceName.binance?serviceName.binance:"",
    },
  ];
  const tokenID = uuid.generate();

  const token = {
    tokenID,
    name,
    symbol,
    price,
    nameOnService,
    preferredServiceUpdate,
    lastUpdate: dayjs().toDate(),
  };

  await new TokenModel(token).save();

  res.status(200).json({ message: "Token added" });
};

export const getAllTokenFromDatabase = async (req, res) => {
  const coins = await TokenModel.find().exec();

  res.status(200).json(coins);
};

export const updateOldestToken = async () => {
  const token =  await TokenModel.findOne().sort({'lastUpdate': 1});

  const preferredService = token.preferredServiceUpdate;
  const locations = token.nameOnService;

  const tokenNameOnPreferredService = locations.filter(service => service.location == preferredService)[0].name;
  token.price = await getPriceByService(preferredService, tokenNameOnPreferredService);

  token.lastUpdate = dayjs().toDate();

  await token.save();
  console.log( token.lastUpdate," Token price updated: ", token.name)
  return;
}
