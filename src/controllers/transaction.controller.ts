import knex from '../config/database'

import { Request, Response, Router } from 'express'
import { config } from 'dotenv'
import { getWallet, initTransaction } from '../helpers/wallet.helper'
import verifyToken from '../middlewares/auth_middleware'

config()



class TransactionsController {
    public path = '/transactions'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }



    public initializeRoutes() {
        this.router.get(`${this.path}/:type/:from/:to`, verifyToken, this.getTransactions)
        // this.router.post(`${this.path}/fund`, verifyToken, this.deposit)
        // this.router.post(`${this.path}/transfer`, verifyToken, this.transfer)
        // this.router.post(`${this.path}/withdraw`, verifyToken, this.withdraw)
    }


    private getTransactions = async (request: any, response: Response) => {
        try {
            const { user_id } = request.user
            let { type, from, to } = request.params

            if (from && to) {

            }

            const transactions = await knex("transactions").select({
                transaction_id: "id",
                wallet_id: "wallet_id",
                date: "date",
                transaction_type: "transaction_type",
                narration: "narration",
                balance: "balance",

            }).where({
                type
            }).whereBetween(
                "date", [from, to]
            )

            const wallet = await getWallet(response, { user_id: user_id })
            return response.status(200).json({ success: true, message: "Wallet retrieved", wallet })
        } catch (error) {
            return response.status(500).json({ success: false, message: "An Error Occurred!" })
        }

    }




}


export default TransactionsController