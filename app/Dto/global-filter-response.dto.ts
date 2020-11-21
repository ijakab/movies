import { SimplePaginatorContract, SimplePaginatorMeta } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder';

export class GlobalFilterResponseDto<T> {
  public meta: SimplePaginatorMeta;

  public data: T[];

  public message: string = `OK`; // did not add ability to override this for now

  public static fromSerialized<T> (serializedData: {meta: SimplePaginatorMeta; data: T[]}): GlobalFilterResponseDto<T>{
    const instance = new GlobalFilterResponseDto<T>();
    instance.meta = serializedData.meta;
    instance.data = serializedData.data;
    return instance;
  }

  public static fromContract<T> (contract: SimplePaginatorContract<T>): GlobalFilterResponseDto<T>{
    const serialized = contract.toJSON();
    return GlobalFilterResponseDto.fromSerialized(serialized);
  }
}
