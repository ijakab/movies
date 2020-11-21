// eslint-disable-next-line @typescript-eslint/naming-convention
import { scope } from "@ioc:Adonis/Lucid/Orm";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Model";
import { FilterQueryDto } from '@ioc:Adonis/Core/Event';

// The correct definition should be
// export function Filterable<T extends typeof BaseModel> (): (model: T) => void {
// However adonis uses proxies to set some of the attribute, which do not work correctly with ts, so any needs to be here

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Filterable (): (model: any) => void {
  return function (model: any): void {
    Object.defineProperty(model, `filtered`, {
      value: scope((
        query: ModelQueryBuilderContract<any, any>,
        filters: FilterQueryDto
      ) => {
        if (filters.orderByField) {
          void query.orderBy(filters.orderByField, filters.orderByMode ?? `desc`);
        }
      }),
    });
  };
}
