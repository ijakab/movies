export class HttpError extends Error {
  public status: number;

  public data?: Record<string, never> | Record<string, never>[];

  public static throwError (status: number, code: string, data?: Record<string, never> | Record<string, never>[]): void {
    // later we would add a logic for translation and data insertion
    const error = new HttpError();
    error.status = status;
    error.data = data;
    error.message = code;
    throw error;
  }
}
