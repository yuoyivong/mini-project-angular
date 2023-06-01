export interface TaskResponse<T> {
  payload: T;
  date: string;
  success: boolean;
}
