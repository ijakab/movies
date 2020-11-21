import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
import { QueryWrapper } from 'App/Helpers/QueryWrapper';

// methods and attributes described here are provided through decorators
// this is just helping typescript understand what properties exists
// as current decorator implementation is very lacking

export default class ExtendedModel extends BaseModel {
  declare public static wrapQuery: <Model>() => QueryWrapper<Model>;
}
