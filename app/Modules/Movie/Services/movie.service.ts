import { BaseService } from 'App/Common/Services/base.service';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

export class MovieService extends BaseService{
  constructor () {
    // @ts-ignore
    super(MovieModel);
  }
}
