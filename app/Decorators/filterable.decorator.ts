// The idea of this decorator is to add `standardFilters` scope to query builders
// Which would accept standardized filters from client, and extend query builder appropriately
// For now, just orderBy and search are added. However, this will probably need to be extended
// On bigger projects, q params will not be enough and we will have standardized json structure with ability to override filters
// On even bigger project, we would need to use document oriented db and adapt this.

// eslint-disable-next-line @typescript-eslint/naming-convention
import { scope } from "@ioc:Adonis/Lucid/Orm";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Model";
import { FilterQueryDto } from '@ioc:Adonis/Core/Event';
import { FilterableOptionsDto } from 'App/Dto/filterable-options.dto';

// The correct definition should be:
// export function Filterable<T extends typeof BaseModel> (): (model: T) => void {
// However adonis uses proxies to set some of the attribute, which do not work correctly with ts, so any needs to be here

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Filterable (filterableOptions: FilterableOptionsDto): (model: any) => void {
  return function (model: any): void {
    Object.defineProperty(model, `standardFilters`, {
      value: scope((
        query: ModelQueryBuilderContract<any, any>,
        filters: FilterQueryDto
      ) => {
        if (filters.orderByField) {
          if (filterableOptions.orderBy.includes(filters.orderByField)) {
            void query.orderBy(filters.orderByField, filters.orderByMode ?? `desc`);
          }
        }
        if (filters.search) {
          for (const searchField of filterableOptions.searchBy) {
            void query.where(searchField, `ilike`, `%${filters.search}%`);
          }
        }
      }),
    });
  };
}
