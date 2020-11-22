import { FilterQueryDto } from '@ioc:Adonis/Core/Event';
import ExtendedModel from 'App/Common/Models/extended.model';
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder';
import { BaseValidator } from 'App/Common/Validators/base.validator';

// this should not be two types, but we want to allow reusing logic over multiple models
export abstract class BaseService <ModelType extends typeof ExtendedModel, Model extends ExtendedModel> {
  constructor (
    protected model: ModelType
  ) {}

  public async filter (queryParams: FilterQueryDto): Promise<SimplePaginatorContract<Model>> {
    return await this.model.wrapQuery<Model>()
      .withFilterQueryDto(queryParams)
      .standardFilters()
      .standardPagination();
  }

  public async create (userInput: any): Promise<Model> {
    const instance = new this.model();
    instance.merge(userInput);
    // @ts-ignore
    await this.handleModelInstanceSave(instance);
    await instance.save();
    // @ts-ignore
    return instance;
  }

  // use to validate / make additional action model instances
  // will be called on creation and update after merging params
  public async handleModelInstanceSave (modelInstance: Model): Promise<void> {
    const validator = this.getValidator();
    await validator.validate(modelInstance);
  }

  protected abstract getValidator (): BaseValidator<Model>;
}
