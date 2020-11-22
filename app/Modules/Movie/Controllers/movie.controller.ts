import { BaseController } from 'App/Common/Controllers/base.controller';
import { MovieService } from 'App/Modules/Movie/Services/movie.service';

export default class MovieController extends BaseController <MovieService> {
  constructor () {
    super();
    this.service = new MovieService();
  }
}
