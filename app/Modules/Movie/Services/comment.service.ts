import { BaseService } from 'App/Common/Services/base.service';
import CommentModel from 'App/Modules/Movie/Models/comment.model';

// @ts-ignore
export class CommentService extends BaseService <typeof CommentModel, CommentModel> {
  constructor () {
    super(CommentModel);
  }

  public async handleModelInstanceSave (modelInstance: CommentModel): Promise<void> {
    //
  }
}
