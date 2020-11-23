// The idea of this decorator is to inject method queryWrapper() which would be called instead of query()
// and it would return wrapped query

// eslint-disable-next-line @typescript-eslint/naming-convention
import { QueryWrapperOptionsDto } from 'App/Common/Dto/query-wrapper-options.dto';
import { QueryWrapper } from 'App/Common/Helpers/QueryWrapper';
import ExtendedModel from 'App/Common/Models/extended.model';

// The correct definition should be:
// export function Filterable<T extends typeof BaseModel> (): (model: T) => void {
// However adonis uses proxies to set some of the attribute, which do not work correctly with ts, so any needs to be here

// eslint-disable-next-line @typescript-eslint/naming-convention
export function InjectQueryWrapper (queryWrapperOptionsDto: QueryWrapperOptionsDto): (model: typeof ExtendedModel) => void {
  return function (model: typeof ExtendedModel): void {
    Object.defineProperty(model, `wrapQuery`, {
      value: function () {
        const qb = model.query();
        // @ts-ignore
        return QueryWrapper.getInstance(qb, queryWrapperOptionsDto);
      },
    });
  };
}
