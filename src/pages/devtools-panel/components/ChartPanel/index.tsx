import * as React from "react";
import { Button, Row, Col, Input, Select, message, DatePicker, Checkbox } from "antd";
import { Chart, LineAdvance } from 'bizcharts';
import "./index.less";
const moment = require('moment');
const { useState, useEffect } = React;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TIME_PICKER_RANGE = 4 * 60 * 1000 // 默认取4分钟内的数据
function ChartPanel(props: { keepMonitor: boolean, curUrl: string }) {
  const [monitorUrls, setMonitorUrls] = useState({});
  const [totalMonitorData, setTotalMonitorData] = useState({});
  const [monitorData, setMonitorData] = useState([]);
  const nowTime = +(new Date());
  const [timeRange, setTimeRange] = useState<[moment.Moment, moment.Moment]>([moment(nowTime - TIME_PICKER_RANGE), moment(nowTime + TIME_PICKER_RANGE)]);   // 时间范围变更
  const [formatShowData, setFormatShowData] = useState(true);
  const { keepMonitor, curUrl } = props;

  function getMonitorData(callback: Function) {
    chrome.storage.local.get({ monitorData: "{}" }, function (data) {
      let _monitorData = JSON.parse(data.monitorData);
      if (!_monitorData[curUrl]) return;
      setTotalMonitorData(_monitorData);
      setMonitorData(_monitorData[curUrl]);
      callback && callback();
    });
  }

  function deleteData() {
    chrome.storage.local.set({
      monitorData: JSON.stringify({
        ...totalMonitorData,
        [curUrl]: []
      })
    }, function (items) {
      message.success("历史数据已清空");
      getMonitorData(() => { });
    });
  }

  useEffect(() => {
    chrome.storage.local.get({ keepMonitor: "{}" }, function (data) {
      setMonitorUrls(JSON.parse(data.keepMonitor))
    });
  }, [keepMonitor])

  useEffect(() => {
    getMonitorData(() => { });
  }, [])

  function refresh() {
    getMonitorData(() => { message.success("数据已刷新"); });
  }

  function checkFromatData(e) {
    let checked = e.target.checked;
    setFormatShowData(checked);
  }

  /**
   * 时间范围变化
   * @param date 例：[_, _]，具体的日期对象
   * @param dateString 例：["2021-03-10 15:12:30", "2021-03-10 18:00:00"] 
   */
  function changTimeRange(date, dateString) {
    console.log("时间范围变化", date, dateString)
    setTimeRange([moment(dateString[0]), moment(dateString[1])]);
  }

  const chartData = [];
  monitorData.forEach((item, index) => {
    const { data, curTime } = item;
    const dateCurTime = new Date(curTime);
    const minRangeTime = new Date((timeRange[0] as any)._i);
    const maxRangeTime = new Date((timeRange[1] as any)._i);
    console.log("dateCurTime", dateCurTime, minRangeTime, maxRangeTime);
    if (dateCurTime < minRangeTime || dateCurTime > maxRangeTime) return;
    data.forEach((dataItem, i) => {
      const { text, time, rule } = dataItem;
      chartData.push({
        dataName: text,   // 线
        time,             // 时长：纵坐标
        rule,             // 其它信息
        curTime: moment(curTime).format('MMMM Do YYYY, h:mm:ss a')           // 获取的指标时的时间
      })
    })
  })

  const monitorDataList = [...monitorData];
  return (
    <div>
      <Row>
        <RangePicker value={timeRange} showTime onChange={changTimeRange} />
        <Button style={{ marginLeft: 20 }} type="link" onClick={refresh} >刷新数据</Button>
        <Button style={{ marginLeft: 5 }} type="link" onClick={deleteData} >清除历史数据</Button>
      </Row>
      <Row>
        {chartData.length == 0 && <p>所选时间段内没有数据，请确保勾选“持续监控”后刷新页面或重选时间范围。</p>}
        <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={chartData} >
          <LineAdvance
            shape="smooth"
            point
            position="curTime*time"  // 横坐标 * 纵坐标
            color="dataName"
          />
        </Chart>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Checkbox checked={formatShowData} onChange={checkFromatData}>格式化数据</Checkbox>
      </Row>
      <Row style={{ marginTop: 15 }}>
        {(monitorDataList.reverse()).map(data => (
          <div style={{ width: "100%" }}>
            <p style={{ fontWeight: "bold" }}>时间：{moment(new Date(data.curTime)).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {formatShowData ? (
              <div>
                <pre>
                  {JSON.stringify(data, undefined, 2)}
                </pre>
              </div>
            ) : <p>{JSON.stringify(data)}</p>}
            <br />
          </div>
        ))}
      </Row>
    </div>
  )
}

export default ChartPanel;