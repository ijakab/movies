import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel';

// this should not be two types, but we want to allow reusing logic over multiple models
export abstract class BaseService <ModelType extends typeof BaseModel, Model extends BaseModel> {
  constructor (
    protected model: ModelType
  ) {}

  public async create (userInput: any): Promise<BaseModel> {
    const instance = new this.model();
    instance.merge(userInput);
    // @ts-ignore This is incorrect typescript implementation, should work, not sure why throws error
    await this.handleModelInstanceSave(instance);
    await instance.save();
    return instance;
  }

  // use to validate / make additional action model instances
  // will be called on creation and update after merging params
  public abstract async handleModelInstanceSave (modelInstance: Model): Promise<void>;
}
