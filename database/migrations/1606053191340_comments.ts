import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { CreateTableBuilder } from 'knex';

export default class Comments extends BaseSchema {
  protected tableName: string = `comments`;

  public up (): void {
    void this.schema.createTable(this.tableName, (table: CreateTableBuilder) => {
      table.increments(`id`);
      table.integer(`movie_id`).unsigned().notNullable().references(`movies.id`).onDelete(`cascade`);
      table.text(`content`);
      table.timestamps(true);
    });
  }

  public down (): void {
    void this.schema.dropTable(this.tableName);
  }
}
