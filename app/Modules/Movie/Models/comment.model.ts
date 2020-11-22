import { DateTime } from 'luxon';
import { belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import { QueryWrapperOptionsDto } from 'App/Common/Dto/query-wrapper-options.dto';
import { InjectQueryWrapper } from 'App/Common/Decorators/inject-query-wrapper';
import ExtendedModel from 'App/Common/Models/extended.model';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

@InjectQueryWrapper(QueryWrapperOptionsDto.getFilterableOptions({
  searchBy: [`content`],
  orderBy: [`created_at`],
}))
export default class CommentModel extends ExtendedModel {
  public static table: string = `comments`;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public movie_id: number;

  @belongsTo(() => MovieModel)
  public movie: BelongsTo<typeof MovieModel>;

  @column()
  public content: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
}
