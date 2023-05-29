export interface GenericResponse<T> {
  payload: T;
  date: string;
  success: boolean;
}
