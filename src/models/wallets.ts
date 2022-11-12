import { Knex } from 'knex'
import createGuts from '../helpers/model-guts'

const name = 'Wallet'
const tableName = 'wallets'

const selectableProps = [
    "id",
    "wallet_balance",
    "wallet_number",
    "user_id",
]

export default (knex: Knex) => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    return {
        ...guts
    }
}