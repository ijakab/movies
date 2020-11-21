// The idea of this decorator is to inject method queryWrapper() which would be called instead of query()
// and it would return wrapped query

// eslint-disable-next-line @typescript-eslint/naming-convention
import { QueryWrapperOptionsDto } from 'App/Dto/query-wrapper-options.dto';
import { QueryWrapper } from 'App/Helpers/QueryWrapper';

// The correct definition should be:
// export function Filterable<T extends typeof BaseModel> (): (model: T) => void {
// However adonis uses proxies to set some of the attribute, which do not work correctly with ts, so any needs to be here

// eslint-disable-next-line @typescript-eslint/naming-convention
export function InjectQueryWrapper (queryWrapperOptionsDto: QueryWrapperOptionsDto): (model: any) => void {
  return function (model: any): void {
    Object.defineProperty(model, `wrapQuery`, {
      value: function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const qb = model.query();
        return QueryWrapper.getInstance(qb, queryWrapperOptionsDto);
      },
    });
  };
}
