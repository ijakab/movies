declare module '@ioc:Adonis/Core/Event' {
  interface FilterQueryDto {
    orderByField?: string;

    orderByMode?: 'asc' | 'desc';

    search?: string;

    page?: number;

    limit?: number;

    afterId?: number;

    // this is a filter for comments. It should not be in common dto, and this logic should be generalized, but this is for this small app
    movieId?: number;
  }
}
