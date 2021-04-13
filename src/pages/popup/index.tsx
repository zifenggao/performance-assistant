import * as React from "react";
import * as ReactDOM from "react-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./index.less";
import IPerformanceDataItem from "@/models/IPerformanceDataItem";
import { getCurrentTabId } from "./../../utils/index";
const { useEffect, useState } = React;

function SimpleDataPanel() {
  const [performanceData, setPerformanceData] = useState<IPerformanceDataItem[]>([]);

  const columns = [
    {
      title: '指标',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '时长/ms',
      dataIndex: 'time',
      key: 'time',
    }
  ];

  useEffect(() => {
    getCurrentTabId((tabId) => {
      chrome.tabs.sendMessage(tabId, {
        cmd: "get-performance-timing"
      }, function (response) {
        let _data = JSON.parse(response);
        setPerformanceData(_data.map((item, index) => {
          return {
            ...item,
            key: index
          }
        }));
      });
    });
  }, [])

  function renderDetail() {
    if (performanceData.length === 0) {
      return <div>请刷新页面</div>
    }
    return (
      <Table
        className="performance-data-table"
        dataSource={performanceData}
        columns={columns}
        expandable={{
          expandedRowRender: (record: IPerformanceDataItem) => {
            const { rule } = record;
            const { params } = rule;
            return (
              <p className="caculate-tip-con">指标：{params[0]} - {params[1]}</p>
            )
          }
        }}
        pagination={false}
        size="small"
      />
    )
  }

  return (
    <div className="popup-con">
      {renderDetail()}
    </div>
  )
}

ReactDOM.render(
  <SimpleDataPanel />,
  document.getElementById('app')
);