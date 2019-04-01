exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments();
        tbl
          .string('name', 255)
          .notNullable()
          .unique('uq_projects_name');
        tbl
          .string('token', 255)
          .notNullable();
      });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTableIfExists('projects');
};