import knex from '../config/database'

import { Request, Response, Router } from 'express'
import { config } from 'dotenv'
import { getWallet, initTransaction } from '../helpers/wallet.helper'
import verifyToken from '../middlewares/auth_middleware'

config()



class WalletController {
    public path = '/wallet'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }



    public initializeRoutes() {
        this.router.get(`${this.path}/`, verifyToken, this.walletDetails)
        this.router.post(`${this.path}/fund`, verifyToken, this.deposit)
        this.router.post(`${this.path}/transfer`, verifyToken, this.transfer)
        this.router.post(`${this.path}/withdraw`, verifyToken, this.withdraw)
    }


    private walletDetails = async (request: any, response: Response) => {
        try {
            const { user_id } = request.user
            const wallet = await getWallet(response, { user_id: user_id })
            return response.status(200).json({ success: true, message: "Wallet retrieved", wallet })
        } catch (error) {
            return response.status(500).json({ success: false, message: "An Error Occurred!" })
        }

    }

    private deposit = async (request: Request | any, response: Response) => {
        try {
            const { amount } = request.body
            const { user_id } = request.user

            if (!amount) return response.status(400).json({ success: false, message: "Deposit amount is required!" })


            let wallet = await getWallet(response, { user_id: user_id })
            const former_balance = wallet.wallet_balance

            await knex("wallets").where({ user_id }).update({
                wallet_balance: parseFloat(former_balance) + parseFloat(amount)
            })


            wallet = await getWallet(response, { user_id: user_id })

            await initTransaction(response, { wallet_id: wallet.wallet_id, transaction_type: "credit", narration: "Wallet Funded", balance: wallet.wallet_balance })


            return response.status(200).json({ success: true, message: "Deposit successful!", wallet })


        } catch (error) {
            return response.status(500).json({ success: false, message: "An Error Occurred!" })

        }
    }

    private transfer = async (request: Request | any, response: Response) => {
        try {
            const { amount, recipient, narration } = request.body
            const { user_id } = request.user

            if (!amount) return response.status(400).json({ success: false, message: "Deposit amount is required!" })
            if (!recipient) return response.status(400).json({ success: false, message: "Recipient is required!" })

            let recipient_wallet = await getWallet(response, { wallet_number: recipient })

            let my_wallet = await getWallet(response, { user_id: user_id })
            const my_former_balance = my_wallet.wallet_balance

            if (my_former_balance < amount) return response.status(422).json({ success: false, message: "You cannot transfer above than your wallet balance!" })

            const recipient_former_balance = recipient_wallet.wallet_balance

            await knex("wallets").where({ user_id }).update({
                wallet_balance: parseFloat(my_former_balance) - parseFloat(amount)
            })
            await knex("wallets").where({ wallet_number: recipient }).update({
                wallet_balance: parseFloat(recipient_former_balance) + parseFloat(amount)
            })


            my_wallet = await getWallet(response, { user_id: user_id })
            recipient_wallet = await getWallet(response, { wallet_number: recipient })

            await initTransaction(response, { wallet_id: my_wallet.wallet_id, transaction_type: "debit", narration: narration ? narration : "", balance: my_wallet.wallet_balance })
            await initTransaction(response, { wallet_id: recipient_wallet.wallet_id, transaction_type: "credit", narration: narration ? narration : "", balance: recipient_wallet.wallet_balance })

            return response.status(200).json({ success: true, message: "Transfer successful!", my_wallet })


        } catch (error) {
            return response.status(500).json({ success: false, message: "An Error Occurred!" })

        }
    }

    private withdraw = async (request: Request | any, response: Response) => {
        try {
            const { amount, } = request.body
            const { user_id } = request.user

            if (!amount) return response.status(400).json({ success: false, message: "Withdrawal amount is required!" })


            let my_wallet = await getWallet(response, { user_id: user_id })
            const my_former_balance = my_wallet.wallet_balance

            if (my_former_balance < amount) return response.status(422).json({ success: false, message: "You cannot withdraw above than your wallet balance!" })


            await knex("wallets").where({ user_id }).update({
                wallet_balance: parseFloat(my_former_balance) - parseFloat(amount)
            })


            my_wallet = await getWallet(response, { user_id: user_id })

            await initTransaction(response, { wallet_id: my_wallet.wallet_id, transaction_type: "debit", narration: "Wallet withdrawal", balance: my_wallet.wallet_balance })


            return response.status(200).json({ success: true, message: "Withdrawal successful!", my_wallet })


        } catch (error) {
            return response.status(500).json({ success: false, message: "An Error Occurred!" })

        }
    }



}


export default WalletController