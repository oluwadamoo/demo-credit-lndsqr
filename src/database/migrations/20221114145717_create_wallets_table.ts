import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", (w) => {
        w.increments('id').primary();
        w.decimal("wallet_balance", 14, 2).defaultTo(0.00);
        w.integer("wallet_number").notNullable();
        w.integer("user_id").unsigned().references("users.id").onDelete("CASCADE");
        w.timestamps(true, true)

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallets")

}

