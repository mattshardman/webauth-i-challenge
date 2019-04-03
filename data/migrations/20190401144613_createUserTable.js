exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments();
        tbl
          .string('user', 255)
          .notNullable()
          .unique('uq_projects_name');
        tbl
          .string('hash', 255)
          .notNullable();
      });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTableIfExists('users');
};