import { BaseService } from 'App/Common/Services/base.service';
import CommentModel from 'App/Modules/Movie/Models/comment.model';
import { CommentValidator } from 'App/Modules/Movie/Validators/comment.validator';

// @ts-ignore
export class CommentService extends BaseService <typeof CommentModel, CommentModel> {
  constructor () {
    super(CommentModel);
  }

  protected getValidator (): CommentValidator {
    return new CommentValidator();
  }
}
