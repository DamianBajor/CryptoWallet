import {updateTokenPrice} from "./jobs/updateTokenPrice";


export const initJobs = () => {
    updateTokenPrice.start()
}

export const stopJobs = (req, res) => {
    updateTokenPrice.stop()
    res.status(200).json({message: "Cron jobs stopped"})
}
