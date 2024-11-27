export default interface IAgent {
  id?: number;
  name: string | null;
  subagent_payer: string[] | null;
  order: number[] | null;
}