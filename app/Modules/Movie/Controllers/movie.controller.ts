// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { GlobalFilterResponseDto } from 'App/Dto/global-filter-response.dto';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ExtractScopes } from '@ioc:Adonis/Lucid/Model';
import { paginateOnQuery } from 'App/Helpers/PaginateOnQuery';

export default class MovieController {
  public async index ({request}: HttpContextContract): Promise<GlobalFilterResponseDto<MovieModel>> {
    const qb = MovieModel.query()
      .apply((scopes: ExtractScopes<MovieModel>) => {
        // @ts-ignore
        scopes.standardFilters(request.get());
      });
    const loaded = await paginateOnQuery<MovieModel>(qb, request.get());
    return GlobalFilterResponseDto.fromContract(loaded);
  }
}
