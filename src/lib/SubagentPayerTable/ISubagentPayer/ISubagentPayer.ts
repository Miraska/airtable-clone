export default interface IAgent {
  id?: number;
  name: string | null;
  subagent: string[] | null;
  order: number[] | null;
}