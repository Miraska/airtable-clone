export default interface ISunagent {
  id?: number;
  name: string | null;
  subagent_payer: string[] | null | string;
  order: number[] | null | string;
}