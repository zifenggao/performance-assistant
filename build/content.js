!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=289)}({191:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.performanceIndicators=t.basePerformanceRules=void 0,t.basePerformanceRules=[{text:"DNS 查询时间",params:["domainLookupEnd","domainLookupStart"]},{text:"TCP连接耗时",params:["connectEnd","connectStart"]},{text:"网络请求耗时",params:["responseStart","requestStart"]},{text:"数据传输耗时",params:["responseEnd","requestStart"]},{text:"页面首次渲染时间",params:["responseEnd","navigationStart"]},{text:"首次可交互时间",params:["domInteractive","navigationStart"]},{text:"DOM解析耗时",params:["domInteractive","responseEnd"]},{text:"DOM构建耗时",params:["domComplete","domInteractive"]},{text:"HTML 加载完成-DOM Ready",params:["domContentLoadedEventEnd","navigationStart"]},{text:"页面完全加载耗时",params:["loadEventStart","navigationStart"]}],t.performanceIndicators=["connectEnd","connectStart","domComplete","domContentLoadedEventEnd","domContentLoadedEventStart","domInteractive","domLoading","domainLookupEnd","domainLookupStart","fetchStart","loadEventEnd","loadEventStart","navigationStart","redirectEnd","redirectStart","requestStart","responseEnd","responseStart","secureConnectionStart","unloadEventEnd","unloadEventStart"]},289:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(191).basePerformanceRules;function o(){var e=[],t=window.performance.timing;return r.forEach((function(n){var r=n.text,o=n.params;void 0!==t[o[0]]&&void 0!==!t[o[1]]&&e.push({text:r,time:t[o[0]]-t[o[1]],rule:n})})),e}chrome.storage.local.get({performanceRules:"[]"},(function(e){var t=JSON.parse(e.performanceRules);t.length>0&&(r=t)})),chrome.runtime.onMessage.addListener((function(e,t,n){var r=e.cmd;"get-performance-timing"===r?n(JSON.stringify(o())):"get-location-href"===r&&n(location.href)})),window.onload=function(){chrome.storage.local.get({keepMonitor:"{}"},(function(e){JSON.parse(e.keepMonitor)[location.href]&&chrome.storage.local.get({monitorData:"{}"},(function(e){var t=JSON.parse(e.monitorData);t[location.href]||(t[location.href]=[]),t[location.href].push({data:o(),curTime:+new Date}),chrome.storage.local.set({monitorData:JSON.stringify(t)},(function(e){console.log("持续监听数据保存成功",t)}))}))}))}}});