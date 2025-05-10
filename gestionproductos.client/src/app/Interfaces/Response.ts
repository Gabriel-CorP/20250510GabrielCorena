export interface Response {
  code: number;
  message: string;
}
export interface GenericResponse<T> extends Response {
  model: T;
}