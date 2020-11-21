// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Movie from 'App/Models/Movie';
import { GlobalFilterResponse } from 'App/Dto/GlobalFilterResponse';

export default class MoviesController {
  public async index (): Promise<GlobalFilterResponse<Movie>> {
    const loaded = await Movie.query()
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .paginate(1, 10);
    return GlobalFilterResponse.fromContract(loaded);
  }
}
