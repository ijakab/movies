import { QueryWrapper } from 'App/Common/Helpers/QueryWrapper';
import { LucidModel } from '@ioc:Adonis/Lucid/Model';
import LucidModelTemp from 'Contracts/lucidTempModel';

// methods and attributes described here are provided through decorators
// this is just helping typescript understand what properties exists
// as current decorator implementation is very lacking

export default class ExtendedModel extends LucidModelTemp implements LucidModel {
  declare public static wrapQuery: <Model extends ExtendedModel>() => QueryWrapper<Model>;
}
