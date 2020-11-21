export class QueryWrapperOptionsDto {
  public searchBy: string[];

  public orderBy: string[];

  public static getFilterableOptions (
    options: {
      searchBy?: string[];
      orderBy?: string[];
    }
  ): QueryWrapperOptionsDto {
    const instance = new QueryWrapperOptionsDto();
    instance.searchBy = options.searchBy ?? [];
    instance.orderBy = options.orderBy ?? [];
    return instance;
  }
}
