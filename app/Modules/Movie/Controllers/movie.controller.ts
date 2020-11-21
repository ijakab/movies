// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { GlobalFilterResponseDto } from 'App/Dto/global-filter-response.dto';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ExtractScopes } from '@ioc:Adonis/Lucid/Model';

export default class MovieController {
  public async index ({request}: HttpContextContract): Promise<GlobalFilterResponseDto<MovieModel>> {
    const loaded = await MovieModel.query()
      .apply((scopes: ExtractScopes<MovieModel>) => {
        // @ts-ignore
        scopes.standardFilters(request.get());
      })
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .paginate(1, 10);
    return GlobalFilterResponseDto.fromContract(loaded);
  }
}
