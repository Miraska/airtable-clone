export default interface IAgent {
  id?: number;
  name: string | null;
  inn: number | null;
  order: number[] | null;
}