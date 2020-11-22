export class GlobalResponseDto<T> {
  public data: T;

  public message: string = `OK`; // did not add ability to override this for now

  public static fromData <T> (data: T): GlobalResponseDto<T>{
    const instance = new GlobalResponseDto<T>();
    instance.data = data;
    return instance;
  }
}
