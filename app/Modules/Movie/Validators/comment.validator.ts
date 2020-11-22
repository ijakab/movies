import { BaseValidator } from 'App/Common/Validators/base.validator';
import { ParsedTypedSchema, rules, schema } from '@ioc:Adonis/Core/Validator';
import CommentModel from 'App/Modules/Movie/Models/comment.model';

export class CommentValidator extends BaseValidator <CommentModel> {
  public getSchema (): ParsedTypedSchema<any> {
    return schema.create({
      content: schema.string({}, [
        rules.required(),
      ]),
      movie_id: schema.number([
        rules.exists({
          table: `movies`,
          column: `id`,
        }),
        rules.required(),
      ]),
    });
  }
}
