import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (t) => {
        t.increments('id').primary();
        t.integer("wallet_id").unsigned().references("wallets.id").onDelete("CASCADE");;
        t.timestamp("date").defaultTo(knex.fn.now());
        t.enum("transaction_type", ["credit", "debit"]);
        t.text("narration")
        t.decimal("balance", 14, 2);

    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions")
}

