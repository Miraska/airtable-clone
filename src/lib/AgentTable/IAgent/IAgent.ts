export default interface IAgent {
  id?: number;
  name: string | null;
  code: number | null;
  full_name: string | null;
  order: number[] | null;
}