import * as validator from "express-validator";

const axios = require("axios");

export const coingeckoStatusAPI = async (req, res, next) => {
  const response = await axios.get(`${process.env.COINGECKOAPIURL}/ping`);

  if (response.status !== 200) {
    const response = { message: "Coingecko API is DOWN" };
    return res.status(500).json(response);
  }

  return next();
};

export const getTokenPriceFromCoingecko = async (tokenID: string) => {
  const params = {
    ids: tokenID,
    vs_currencies: "usd",
  };

  const responseCoinPrice = await axios.get(
    `${process.env.COINGECKOAPIURL}/simple/price`,
    { params }
  );

  return responseCoinPrice.data[tokenID].usd;
};

export const getAllTokenByNameFromCoingecko = async (req, res) => {
  validator.body(req.body);
  const tokenName = req.body.tokenName;

  const responseCoinsList = await axios.get(
    `${process.env.COINGECKOAPIURL}/coins/list`
  );
  const wantedCoin = responseCoinsList.data.filter(
    (element) =>
      element.symbol.toLowerCase() === tokenName ||
      element.name.toLowerCase() === tokenName
  );

  res.status(200).json(wantedCoin);
};


