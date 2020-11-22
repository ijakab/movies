import { BaseService } from 'App/Common/Services/base.service';
import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { getMovieDetails } from 'App/Modules/Movie/Helpers/get-movie-details.helper';

// @ts-ignore
export class MovieService extends BaseService <typeof MovieModel> {
  constructor () {
    super(MovieModel);
  }

  public async handleModelInstanceSave (modelInstance: MovieModel): Promise<void> {
    const movieDetails = await getMovieDetails(modelInstance.title);
    console.log(movieDetails);
  }
}