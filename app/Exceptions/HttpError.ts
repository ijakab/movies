export class HttpError extends Error {
  public status: number;

  public data?: any;

  public static throwError (status: number, code: string, data?: any): void {
    // later we would add a logic for translation and data insertion
    const error = new HttpError();
    error.status = status;
    error.data = data;
    error.message = code;
    throw error;
  }
}
