import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { CreateTableBuilder } from 'knex';

export default class Movies extends BaseSchema {
  protected tableName: string = `movies`;

  public up (): void {
    void this.schema.createTable(this.tableName, (table: CreateTableBuilder) => {
      table.increments(`id`).primary();
      table.string(`title`).index().notNullable();
      table.string(`year`).index().notNullable();
      table.string(`director`).index().notNullable();
      table.string(`poster`);
      table.text(`genre`);
      table.timestamps(true);
    });
  }

  public down (): void {
    void this.schema.dropTable(this.tableName);
  }
}
