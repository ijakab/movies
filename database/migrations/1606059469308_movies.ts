import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { AlterTableBuilder } from 'knex';

export default class Movies extends BaseSchema {
  protected tableName: string = `movies`;

  public up (): void {
    void this.schema.alterTable(this.tableName, (table: AlterTableBuilder) => {
      table.string(`imdb_id`).index().unique().notNullable();
    });
  }

  public down (): void {
    void this.schema.alterTable(this.tableName, (table: AlterTableBuilder) => {
      table.dropIndex(`imdb_id`);
      table.dropColumn(`imdb_id`);
    });
  }
}
