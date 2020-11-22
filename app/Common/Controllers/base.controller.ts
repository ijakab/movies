import { BaseService } from 'App/Common/Services/base.service';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel';
import { GlobalResponseDto } from 'App/Common/Dto/global-response.dto';
import { GlobalFilterResponseDto } from 'App/Common/Dto/global-filter-response.dto';
import MovieModel from 'App/Modules/Movie/Models/movie.model';

// We need an ignore line below, as we do not know here what models will services use.
// Typescript does not recognize derived classes as assignable to base classes when typeof is used
// @ts-ignore
export abstract class BaseController <Service extends BaseService> {
  protected service: Service;

  public async index ({request}: HttpContextContract): Promise<GlobalFilterResponseDto<MovieModel>> {
    const loaded = await this.service.filter(request.get());
    return GlobalFilterResponseDto.fromContract(loaded);
  }

  public async create ({request}: HttpContextContract): Promise<GlobalResponseDto<BaseModel>> {
    const instance = await this.service.create(request.post());
    return GlobalResponseDto.fromData(instance);
  }
}
