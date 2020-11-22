import { ParsedTypedSchema, validator } from '@ioc:Adonis/Core/Validator';
import { HttpError } from 'App/Exceptions/HttpError';
import { ResponseCodeEnum } from 'App/Common/Enum/response-code.enum';

export abstract class BaseValidator <Model> {
  public async validate (modelInstance: Model): Promise<void> {
    // The reason we validate model instances instead of client input is that client may not send only partial data yo update
    // And some rule (required) would fail. We need to check entity as a whole
    const schema = this.getSchema();
    try {
      await validator.validate({
        schema,
        data: modelInstance,
      });
    } catch (e) {
      HttpError.throwError(ResponseCodeEnum.UnprocessableEntity, `error.validationFailed`, e.messages);
    }
  }

  public abstract getSchema (): ParsedTypedSchema<any>;
}
