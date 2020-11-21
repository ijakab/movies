import { DateTime } from 'luxon';
import { column } from '@ioc:Adonis/Lucid/Orm';
import { QueryWrapperOptionsDto } from 'App/Dto/query-wrapper-options.dto';
import { InjectQueryWrapper } from 'App/Decorators/inject-query-wrapper';
import ExtendedModel from 'App/Models/extended.model';

@InjectQueryWrapper(QueryWrapperOptionsDto.getFilterableOptions({
  searchBy: [`title`],
  orderBy: [`created_at`],
}))
export default class MovieModel extends ExtendedModel {
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
