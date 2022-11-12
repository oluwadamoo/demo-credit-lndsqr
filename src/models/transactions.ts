import { Knex } from 'knex'
import createGuts from '../helpers/model-guts'

const name = 'Transaction'
const tableName = 'transactions'

const selectableProps = [
    "id",
    "wallet_id",
    "date",
    "balance",
    "transaction_type",
    "narration"
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