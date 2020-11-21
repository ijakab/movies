export class FilterableOptionsDto {
  public searchBy: string[];

  public orderBy: string[];

  public static getFilterableOptions (
    options: {
      searchBy?: string[];
      orderBy?: string[];
    }
  ): FilterableOptionsDto {
    const instance = new FilterableOptionsDto();
    instance.searchBy = options.searchBy ?? [];
    instance.orderBy = options.orderBy ?? [];
    return instance;
  }
}
