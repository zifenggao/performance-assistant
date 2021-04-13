import * as React from "react";
import * as ReactDOM from "react-dom";
import { Tabs, Button, Row, Col, Input, Select, message, Checkbox } from "antd";
import "antd/dist/antd.css";
import "./index.less";
import RulePanel from "./components/RulePanel";
import ChartPanel from "./components/ChartPanel";
import { getCurrentTabId } from "./../../utils/index";
const { useState, useEffect } = React;
const { Option } = Select;
const { TabPane } = Tabs;

function Panel() {
  const [monitorUrls, setMonitorUrls] = useState({});
  const [keepMonitor, setKeepMonitor] = useState(false);
  const [curUrl, setCurUrl] = useState("");

  useEffect(() => {
    getCurrentTabId((tabId) => {
      chrome.tabs.sendMessage(tabId, {
        cmd: "get-location-href"
      }, function (response) {
        if (!response) {
          message.warn("请刷新页面后重新打开开发者工具");
          return;
        }
        setCurUrl(response);
        chrome.storage.local.get({ keepMonitor: "{}" }, function (data) {
          let _monitorUrls = JSON.parse(data.keepMonitor);
          setMonitorUrls(_monitorUrls);
          setKeepMonitor(!!_monitorUrls[response]);
        });
      });
    });
  }, [])

  function switchKeepMonitor(e) {
    let checked = e.target.checked;
    setKeepMonitor(checked);
    chrome.storage.local.set({
      keepMonitor: JSON.stringify({
        ...monitorUrls,
        [curUrl]: checked
      })
    }, function (items) {
      message.success(`${checked ? "开启" : "停止"}持续监听`);
    });
  }

  function changeTab() {

  }

  return (
    <div className="devtools-panel-con">
      <Row>
        <Checkbox checked={keepMonitor} onChange={switchKeepMonitor}>持续监控</Checkbox>
      </Row>
      <Tabs defaultActiveKey="1" onChange={changeTab}>
        <TabPane tab="指标配置" key="1">
          <RulePanel />
        </TabPane>
        <TabPane tab="性能图表" key="2">
          <ChartPanel keepMonitor={keepMonitor} curUrl={curUrl} />
        </TabPane>
      </Tabs>
    </div >
  )
}

ReactDOM.render(
  <Panel />,
  document.getElementById("app")
);