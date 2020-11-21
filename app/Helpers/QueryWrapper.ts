import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model';
import { FilterQueryDto } from "@ioc:Adonis/Core/Event";
import { SimplePaginatorContract } from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";
import filterConfig from 'Config/filter';
import { QueryWrapperOptionsDto } from 'App/Dto/query-wrapper-options.dto';

// The idea of this decorator is to add `standardFilters` scope to query builders
// Which would accept standardized filters from client, and extend query builder appropriately
// For now, just orderBy and search are added. However, this will probably need to be extended
// On bigger projects, q params will not be enough and we will have standardized json structure with ability to override filters
// On even bigger project, we would need to use document oriented db and adapt this.

export class QueryWrapper<Model> {
  constructor (
    private queryBuilder: ModelQueryBuilderContract<any, any>,
    private queryWrapperOptionsDto: QueryWrapperOptionsDto,
  ) {}

  public static getInstance<Model> (
    queryBuilder: ModelQueryBuilderContract<any, any>,
    queryWrapperOptions: QueryWrapperOptionsDto
  ): QueryWrapper<Model> {
    return new QueryWrapper(queryBuilder, queryWrapperOptions);
  }

  public async standardPagination (
    filterQueryDto: FilterQueryDto
  ): Promise<SimplePaginatorContract<Model>> {
    const page = filterQueryDto.page ?? filterConfig.defaultPage;
    const limit = filterQueryDto.limit && filterQueryDto.limit < filterConfig.maximumLimit && filterQueryDto.limit > filterConfig.minimumLimit
      ? filterQueryDto.limit
      : filterConfig.defaultLimit;

    // we did not handle last-record pagination here
    // but can be handled with filters by created_at, and page will always be the first one

    return await this.queryBuilder.paginate(page, limit);
  }

  public standardFilters (filterQueryDto: FilterQueryDto): QueryWrapper<Model> {
    if (filterQueryDto.orderByField) {
      if (this.queryWrapperOptionsDto.orderBy.includes(filterQueryDto.orderByField)) {
        void this.queryBuilder.orderBy(filterQueryDto.orderByField, filterQueryDto.orderByMode ?? `desc`);
      }
    }
    if (filterQueryDto.search) {
      for (const searchField of this.queryWrapperOptionsDto.searchBy) {
        void this.queryBuilder.where(searchField, `ilike`, `%${filterQueryDto.search}%`);
      }
    }
    return this;
  }
}
