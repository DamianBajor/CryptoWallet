import { Schema, model } from "mongoose";
import { INameOnService, IToken } from "./tokenInterfaces";

const nameOnService = new Schema<INameOnService>(
  {
    location: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { _id: false }
);

const tokenSchema = new Schema<IToken>({
  tokenID: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  symbol: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  nameOnService: {
    type: [nameOnService],
  },
  preferredServiceUpdate:{
    type: String,
    required: false,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

export const TokenModel = model("Token", tokenSchema);
