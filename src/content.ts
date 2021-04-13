import IPerformanceRule from "@/models/IPerformanceRule";
import IPerformanceDataItem from "@/models/IPerformanceDataItem";
import { basePerformanceRules } from "./config/index";

let curRules = basePerformanceRules;
chrome.storage.local.get({ performanceRules: "[]" }, function (data) {
  let _rules = JSON.parse(data.performanceRules);
  if (_rules.length > 0) {
    curRules = _rules;
  }
});


// 获取加载性能数据
function getLoadingPerformanceData() {
  const _data: IPerformanceDataItem[] = [];
  const timing = window.performance.timing;
  curRules.forEach((rule: IPerformanceRule) => {
    const { text, params } = rule;
    if (timing[params[0]] === undefined || !timing[params[1]] === undefined) return;
    _data.push({
      text,
      time: timing[params[0]] - timing[params[1]],
      rule
    })
  });

  return _data;
}


// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  const { cmd } = request;
  // 获取页面加载性能数据
  if (cmd === "get-performance-timing") {
    sendResponse(JSON.stringify(getLoadingPerformanceData()));
  } else if (cmd === "get-location-href") {
    // 获取页面地址
    sendResponse(location.href);
  }
});


function checkKeepMonitor() {
  chrome.storage.local.get({ keepMonitor: "{}" }, function (data) {
    let _monitorUrls = JSON.parse(data.keepMonitor);
    if (_monitorUrls[location.href]) {
      chrome.storage.local.get({ monitorData: "{}" }, function (data) {
        let monitorData = JSON.parse(data.monitorData);
        if (!monitorData[location.href]) monitorData[location.href] = [];
        monitorData[location.href].push({
          data: getLoadingPerformanceData(),
          curTime: +(new Date())
        });
        chrome.storage.local.set({
          monitorData: JSON.stringify(monitorData)
        }, function (items) {
          console.log("持续监听数据保存成功", monitorData)
        });
      });
    }
  });
}

window.onload = function () {
  checkKeepMonitor();
}