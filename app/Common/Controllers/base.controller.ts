import { BaseService } from 'App/Common/Services/base.service';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel';
import { GlobalResponseDto } from 'App/Common/Dto/global-response.dto';

export abstract class BaseController <Service extends BaseService> {
  protected service: Service;

  public async create ({request}: HttpContextContract): Promise<GlobalResponseDto<BaseModel>> {
    const instance = await this.service.create(request.post());
    return GlobalResponseDto.fromData(instance);
  }
}
