export default interface IManager {
  id?: number;
  name: string | null;
  tel: string | null;
  date: string | null;
  order: number[] | null;
  review_table: number[] | null;
}