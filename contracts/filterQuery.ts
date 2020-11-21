declare module '@ioc:Adonis/Core/Event' {
  interface FilterQueryDto {
    orderByField?: string;

    orderByMode?: 'asc' | 'desc';
  }
}
