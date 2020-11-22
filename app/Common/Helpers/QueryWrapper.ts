import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model';
import { FilterQueryDto } from "@ioc:Adonis/Core/Event";
import { SimplePaginatorContract } from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";
import filterConfig from 'Config/filter';
import { QueryWrapperOptionsDto } from 'App/Common/Dto/query-wrapper-options.dto';

// The idea of this decorator is to add `standardFilters` scope to query builders
// Which would accept standardized filters from client, and extend query builder appropriately
// For now, just orderBy and search are added. However, this will probably need to be extended
// On bigger projects, q params will not be enough and we will have standardized json structure with ability to override filters
// On even bigger project, we would need to use document oriented db and adapt this.

export class QueryWrapper<Model> {
  private fallbackFilters: FilterQueryDto;

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
    filterQueryDto?: FilterQueryDto
  ): Promise<SimplePaginatorContract<Model>> {
    const filters = this.checkFallback(filterQueryDto);
    const page = filters.page ?? filterConfig.defaultPage;
    const limit = filters.limit && filters.limit < filterConfig.maximumLimit && filters.limit > filterConfig.minimumLimit
      ? filters.limit
      : filterConfig.defaultLimit;

    // we did not handle last-record pagination here
    // but can be handled with filters by created_at, and page will always be the first one

    return await this.queryBuilder.paginate(page, limit);
  }

  public standardFilters (filterQueryDto?: FilterQueryDto): QueryWrapper<Model> {
    const filters = this.checkFallback(filterQueryDto);
    if (filters.orderByField) {
      if (this.queryWrapperOptionsDto.orderBy.includes(filters.orderByField)) {
        void this.queryBuilder.orderBy(filters.orderByField, filters.orderByMode ?? `desc`);
      }
    }
    if (filters.search) {
      for (const searchField of this.queryWrapperOptionsDto.searchBy) {
        void this.queryBuilder.where(searchField, `ilike`, `%${filters.search}%`);
      }
    }
    return this;
  }

  public withFilterQueryDto (filters: FilterQueryDto): QueryWrapper<Model> {
    this.fallbackFilters = filters;
    return this;
  }

  private checkFallback (argumentFilters?: FilterQueryDto): FilterQueryDto {
    return argumentFilters ? argumentFilters : this.fallbackFilters;
  }
}
