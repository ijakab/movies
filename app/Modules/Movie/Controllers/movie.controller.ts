import MovieModel from 'App/Modules/Movie/Models/movie.model';
import { GlobalFilterResponseDto } from 'App/Common/Dto/global-filter-response.dto';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { BaseController } from 'App/Common/Controllers/base.controller';
import { MovieService } from 'App/Modules/Movie/Services/movie.service';

export default class MovieController extends BaseController {
  constructor () {
    super();
    this.service = new MovieService();
  }

  public async index ({request}: HttpContextContract): Promise<GlobalFilterResponseDto<MovieModel>> {
    const loaded = await MovieModel.wrapQuery<MovieModel>()
      .withFilterQueryDto(request.get())
      .standardFilters()
      .standardPagination();
    return GlobalFilterResponseDto.fromContract(loaded);
  }
}
