// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { GlobalFilterResponseDto } from 'App/Dto/global-filter-response.dto';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class MovieController {
  public async index ({request}: HttpContextContract): Promise<GlobalFilterResponseDto<MovieModel>> {
    const loaded = await MovieModel.wrapQuery<MovieModel>()
      .withFilterQueryDto(request.get())
      .standardFilters()
      .standardPagination();
    return GlobalFilterResponseDto.fromContract(loaded);
  }
}
