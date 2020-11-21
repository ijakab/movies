// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { GlobalFilterResponseDto } from 'App/Dto/global-filter-response.dto';

export default class MovieController {
  public async index (): Promise<GlobalFilterResponseDto<MovieModel>> {
    const loaded = await MovieModel.query()
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .paginate(1, 10);
    return GlobalFilterResponseDto.fromContract(loaded);
  }
}
