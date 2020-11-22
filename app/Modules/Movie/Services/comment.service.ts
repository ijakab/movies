import { BaseService } from 'App/Common/Services/base.service';
import CommentModel from 'App/Modules/Movie/Models/comment.model';
import { CommentValidator } from 'App/Modules/Movie/Validators/comment.validator';
import { FilterQueryDto } from '@ioc:Adonis/Core/Event';
import { QueryWrapper } from 'App/Common/Helpers/QueryWrapper';

export class CommentService extends BaseService <typeof CommentModel, CommentModel> {
  constructor () {
    super(CommentModel);
  }

  public getFilterQuery (queryParams: FilterQueryDto): QueryWrapper<CommentModel> {
    const wrapper = super.getFilterQuery(queryParams);
    const qb = wrapper.getQueryBuilder();
    // @ts-ignore not sure why this wont compile
    void qb.preload(`movie`);
    if (queryParams.movieId) {
      void qb.where(`movie_id`, queryParams.movieId);
    }
    return wrapper;
  }

  protected getValidator (): CommentValidator {
    return new CommentValidator();
  }
}
