import knex from '../config/database'
// const { User } = models
import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from 'dotenv'
import verifyToken from '../middlewares/auth_middleware'
import { getUser } from '../helpers/user.helper'

config()


const hashPassword = async (password: string, saltP?: number) => {
    const salt = saltP ? saltP : process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 20

    return await bcrypt.hash(password, salt)

}

const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

const createToken = ({ user_id, email }: any) => {
    let tokenKey = process.env.TOKEN_KEY

    return sign(
        { user_id, email },
        tokenKey ? tokenKey : "3344cerjwesd",
        {
            expiresIn: '3h'
        }
    )

}

class AuthController {
    public path = '/auth'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }



    public initializeRoutes() {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
    }


    private login = async (request: Request, response: Response) => {
        try {

            const { email, password } = request.body
            if (!email || !password) return response.status(422).json({
                success: false,
                message: '`email` and `password` are required fields'
            })

            let user = await getUser(response, { email: email })

            const token = createToken({ user_id: user.id, email })

            let verified = await verifyPassword(password, user.password)

            if (!verified) return response.status(403).json({ success: false, message: 'email or password is incorrect' })


            return response.json({
                success: true, message: "Login successful!", user: {
                    ...user,
                    token
                }
            })



        } catch (error) {
            console.log(error)
            return response.status(500).json({
                success: false,
                message: "An Error occurred!"
            })
        }

    }

    private register = async (request: Request, response: Response) => {
        try {

            const { first_name, last_name, email, password } = request.body

            if (!first_name || !last_name || !email || !password) return response.status(400).json({ success: false, message: "All fields are required" })

            const existingUser = await knex("users").select().where({ email })

            if (existingUser.length) return response.status(400).json({ success: false, message: "User exists, login instead" })

            const hashedPassword = await hashPassword(password)


            const id = await knex('users').insert({ ...request.body, email: email.toLowerCase(), password: hashedPassword })

            let wallet_number = id[0].toString().length < 2 ? 10000000 + id[0] : id[0].toString().length < 3 ? 10000000 + id[0] : 1000000 + id[0]
            const wallet_id = await knex('wallets').insert({ wallet_balance: 0.00, wallet_number, user_id: id })


            let user = await getUser(response, { id: id })


            const token = createToken({ user_id: user.id, email })


            return response.status(201).json({
                success: true,
                message: "Registration successful!",
                user: {
                    ...user,
                    password: null,
                    token
                },
            })

        } catch (error) {
            console.log(error)
            return response.status(500).json({
                success: false,
                message: "An Error occurred!"
            })
        }
    }
}


export default AuthController