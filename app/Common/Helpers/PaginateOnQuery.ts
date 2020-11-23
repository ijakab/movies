import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model';
import { FilterQueryDto } from '@ioc:Adonis/Core/Event';
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder';
import filterConfig from 'Config/filter';
import ExtendedModel from 'App/Common/Models/extended.model';

export async function paginateOnQuery<T extends ExtendedModel> (
  qb: ModelQueryBuilderContract<T>,
  filterQueryDto: FilterQueryDto
): Promise<SimplePaginatorContract<InstanceType<T>>> {
  const page = filterQueryDto.page ?? filterConfig.defaultPage;
  const limit = filterQueryDto.limit && filterQueryDto.limit < filterConfig.maximumLimit && filterQueryDto.limit > filterConfig.minimumLimit
    ? filterQueryDto.limit
    : filterConfig.defaultLimit;

  // we did not handle last-record pagination here
  // but can be handled with filters by created_at, and page will always be the first one

  return await qb.paginate(page, limit);
}
