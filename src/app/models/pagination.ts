export interface Pagination<T> {
  offset: number;
  limit: number;
  total: number;
  items: Array<T>;
}
