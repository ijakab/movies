import { BaseService } from 'App/Common/Services/base.service';
import CommentModel from 'App/Modules/Movie/Models/comment.model';
import { CommentValidator } from 'App/Modules/Movie/Validators/comment.validator';
import { FilterQueryDto } from '@ioc:Adonis/Core/Event';
import { QueryWrapper } from 'App/Common/Helpers/QueryWrapper';

// @ts-ignore
export class CommentService extends BaseService <typeof CommentModel, CommentModel> {
  constructor () {
    super(CommentModel);
  }

  getFilterQuery (queryParams: FilterQueryDto): QueryWrapper<CommentModel> {
    const wrapper = super.getFilterQuery(queryParams);

    return wrapper;
  }

  protected getValidator (): CommentValidator {
    return new CommentValidator();
  }
}
