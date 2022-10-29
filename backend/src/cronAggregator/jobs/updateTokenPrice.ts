import cron from 'node-cron';
import {updateOldestToken} from "../../tokenAggregator/tokenController";

export const updateTokenPrice = cron.schedule('*/20 * * * * *', updateOldestToken);
