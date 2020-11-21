import { SimplePaginatorContract, SimplePaginatorMeta } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder'

export class GlobalFilterResponse<T> {
  public meta: SimplePaginatorMeta;

  public data: T[];

  public message: string = `OK`; // did not add ability to override this for now

  public static fromSerialized<T> (serializedData: {meta: SimplePaginatorMeta; data: T[]}): GlobalFilterResponse<T>{
    const instance = new GlobalFilterResponse<T>();
    instance.meta = serializedData.meta;
    instance.data = serializedData.data;
    return instance;
  }

  public static fromContract<T> (contract: SimplePaginatorContract<T>): GlobalFilterResponse<T>{
    const serialized = contract.toJSON();
    return GlobalFilterResponse.fromSerialized(serialized);
  }
}
