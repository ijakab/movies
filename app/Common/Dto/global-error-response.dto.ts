import { HttpError } from 'App/Exceptions/HttpError';
import Env from '@ioc:Adonis/Core/Env';
import { ResponseCodeEnum } from 'App/Common/Enum/response-code.enum';

export class GlobalErrorResponseDto {
  public message: string;

  public status: number;

  public data: any;

  public stack?: string; // later we could add a stack parser

  public static fromHttpError (error: HttpError | Error): GlobalErrorResponseDto{
    const instance = new GlobalErrorResponseDto();
    if (error[`status`] >= ResponseCodeEnum.InternalServerError) {
      if (Env.get(`NODE_ENV`) === `production`) {
        instance.message = `error.internalServerError`;
        return instance;
      }
    }
    instance.message = error.message;
    instance.data = error[`data`];
    instance.stack = error.stack;
    return instance;
  }
}
