exports.up = function (knex, Promise) {
    return knex.schema.createTable('peoples', function (table) {
        table.integer('id').primary();
        table.string('name').notNullable();
        table.integer('age').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('peoples');
};
