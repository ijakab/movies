declare module '@ioc:Adonis/Core/Event' {
  interface FilterQueryDto {
    orderByField?: string;

    orderByMode?: 'asc' | 'desc';

    search?: string;

    page?: number;

    limit?: number;

    afterId?: number;
  }
}
