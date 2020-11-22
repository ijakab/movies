import { BaseController } from 'App/Common/Controllers/base.controller';
import { CommentService } from 'App/Modules/Movie/Services/comment.service';

export default class MovieController extends BaseController <CommentService> {
  constructor () {
    super();
    this.service = new CommentService();
  }
}
