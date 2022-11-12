import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import createGuts from '../helpers/model-guts'

interface UserInterface {
    id: number,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    profile_image: string

}
const name = "User"
const tableName = "users"


const selectableProps = [
    'id',
    "first_name",
    "last_name",
    "email",
    "profile_image"
]

const SALT_ROUNDS = 10
const hashedPassword = (password: string) => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash)

const beforeSave = async (user: UserInterface) => {
    if (!user.password) return Promise.resolve(user)

    try {
        const hash = await hashedPassword(user.password)
        return ({ ...user, password: hash })
    } catch (error) {
        return `Error hashing password: ${error}`
    }
}


export default (knex: Knex) => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    })

    const create = (props: UserInterface) => beforeSave(props).then(user => guts.create(user))

    const verify = (email: string, password: string) => {
        const matchErrorMsg = "Username or password do not match"

        knex.select()
            .from(tableName)
            .where({ email })
            .timeout(guts.timeout)
            .then((user: any) => {
                if (!user) throw matchErrorMsg
                return user
            })
            .then(user => Promise.all([user, verifyPassword(password, user.password)]))
            .then(([user, isMatch]) => {
                if (!isMatch) throw matchErrorMsg
                return user
            })
    }

    return {
        ...guts,
        create,
        verify
    }
}