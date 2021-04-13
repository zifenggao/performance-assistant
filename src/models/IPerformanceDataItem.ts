import IPerformanceRule from "./IPerformanceRule";

export default interface IPerformanceDataItem {
  text: string,
  time: number,
  rule: IPerformanceRule
}
