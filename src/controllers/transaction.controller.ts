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
        this.router.get(`${this.path}/`, verifyToken, this.getAllTransactions)
    }


    private getAllTransactions = async (request: any, response: Response) => {
        try {
            const { user_id } = request.user

            const wallet = await getWallet(response, { user_id: user_id })


            let transactions = await knex("transactions").select({
                id: "id",
                wallet_id: "wallet_id",
                transaction_date: "created_at",
                balance: "balance",
                transaction_type: "transaction_type",
                narration: 'narration'

            }).where({
                wallet_id: wallet.wallet_id
            })
            return response.status(200).json({ success: true, message: "Wallet retrieved", transactions })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ success: false, message: "An Error Occurred!" })
        }

    }




}


export default TransactionsController