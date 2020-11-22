import { BaseValidator } from 'App/Common/Validators/base.validator';
import { ParsedTypedSchema, rules, schema } from '@ioc:Adonis/Core/Validator';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

export class MovieValidator extends BaseValidator <MovieModel> {
  public getSchema (): ParsedTypedSchema<any> {
    return schema.create({
      title: schema.string({}, [
        rules.required(),
      ]),
      director: schema.string(),
      genre: schema.string(),
      poster: schema.string(),
      year: schema.string(),
      imdb_id: schema.string({}, [
        rules.unique({
          table: `movies`,
          column: `imdb_id`,
        }),
      ]),
    });
  }
}
