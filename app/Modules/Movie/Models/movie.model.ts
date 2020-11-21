import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { Filterable } from 'App/Decorators/filterable.decorator';
import { FilterableOptionsDto } from 'App/Dto/filterable-options.dto';

@Filterable(FilterableOptionsDto.getFilterableOptions({
  searchBy: [`title`],
  orderBy: [`created_at`],
}))
export default class MovieModel extends BaseModel {
  public static table: string = `movies`;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public year: string;

  @column()
  public director: string;

  @column()
  public poster: string;

  @column()
  public genre: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
}
