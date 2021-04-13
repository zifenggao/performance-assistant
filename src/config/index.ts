import IPerformanceRule from "@/models/IPerformanceRule";

export const basePerformanceRules: IPerformanceRule[] = [
  {
    text: "DNS 查询时间",
    params: ["domainLookupEnd", "domainLookupStart"],
  },
  {
    text: "TCP连接耗时",
    params: ["connectEnd", "connectStart"]
  },
  {
    text: "网络请求耗时",
    params: ["responseStart", "requestStart"],
  },
  {
    text: "数据传输耗时",
    params: ["responseEnd", "requestStart"]
  },
  {
    text: "页面首次渲染时间",
    params: ["responseEnd", "navigationStart"]
  },
  {
    text: "首次可交互时间",
    params: ["domInteractive", "navigationStart"]
  },
  {
    text: "DOM解析耗时",
    params: ["domInteractive", "responseEnd"]
  },
  {
    text: "DOM构建耗时",
    params: ["domComplete", "domInteractive"]
  },
  {
    text: "HTML 加载完成-DOM Ready",
    params: ["domContentLoadedEventEnd", "navigationStart"]
  },
  {
    text: "页面完全加载耗时",
    params: ["loadEventStart", "navigationStart"]
  }
]

export const performanceIndicators = [
  "connectEnd",
  "connectStart",
  "domComplete",
  "domContentLoadedEventEnd",
  "domContentLoadedEventStart",
  "domInteractive",
  "domLoading",
  "domainLookupEnd",
  "domainLookupStart",
  "fetchStart",
  "loadEventEnd",
  "loadEventStart",
  "navigationStart",
  "redirectEnd",
  "redirectStart",
  "requestStart",
  "responseEnd",
  "responseStart",
  "secureConnectionStart",
  "unloadEventEnd",
  "unloadEventStart"
]