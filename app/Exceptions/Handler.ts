/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpError } from 'App/Exceptions/HttpError';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GlobalErrorResponseDto } from 'App/Common/Dto/global-error-response.dto';
import { ResponseCodeEnum } from 'App/Enum/response-code.enum';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle (error: any, {response}: HttpContextContract): Promise<void> {
    if (error instanceof HttpError) {
      return response
        .status(error.status || ResponseCodeEnum.InternalServerError)
        .send(GlobalErrorResponseDto.fromHttpError(error));
    }
  }
}
