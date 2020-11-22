import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel';

export abstract class BaseService {
  constructor (
    protected model: typeof BaseModel
  ) {}

  // use to validate / make additional action model instances
  // will be called on creation and update after merging params
  public async handleModelInstanceSave (modelInstance: BaseModel): Promise<void> {}

  public async create (userInput: any): Promise<BaseModel> {
    const instance = new this.model();
    instance.merge(userInput);
    await this.handleModelInstanceSave(instance);
    await instance.save();
    return instance;
  }
}
