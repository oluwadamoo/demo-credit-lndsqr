import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (u) => {
        u.increments('id').primary();
        u.string("first_name", 100).notNullable();
        u.string("last_name", 100).notNullable();
        u.string("email", 100).notNullable();
        u.string("password", 100).notNullable();
        u.string("profile_picture", 100);
        u.timestamps(true, true)
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");

}

