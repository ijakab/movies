import { BaseService } from 'App/Common/Services/base.service';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel';
import { GlobalResponseDto } from 'App/Common/Dto/global-response.dto';

// We need an ignore line below, as we do not know here what models will services use.
// Typescript does not recognize derived classes as assignable to base classes when typeof is used
// @ts-ignore
export abstract class BaseController <Service extends BaseService> {
  protected service: Service;

  public async create ({request}: HttpContextContract): Promise<GlobalResponseDto<BaseModel>> {
    const instance = await this.service.create(request.post());
    return GlobalResponseDto.fromData(instance);
  }
}
