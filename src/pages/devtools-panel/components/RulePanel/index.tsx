import * as React from "react";
import { Button, Row, Col, Input, Select, message } from "antd";
import "./index.less";
import { basePerformanceRules, performanceIndicators } from "./../../../../config/index";
import IPerformanceRule from "@/models/IPerformanceRule";
const { useState, useEffect } = React;
const { Option } = Select;

const baseRules = JSON.stringify(basePerformanceRules);
function RulePanel() {
  const [rules, setRules] = useState<IPerformanceRule[]>([...basePerformanceRules]);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    chrome.storage.local.get({ performanceRules: "[]" }, function (data) {
      let _rules = JSON.parse(data.performanceRules);
      console.log("get storage--", _rules);
      if (_rules.length > 0) {
        setRules(_rules);
      }
    });
  }, [])

  function addNewRule() {
    setRules([
      {
        text: "",
        params: ["", ""]
      },
      ...rules,
    ]);
  }

  function save() {
    chrome.storage.local.set({ performanceRules: JSON.stringify(rules) }, function (items) {
      message.success("保存成功");
      setShowSave(false);
    });
  }

  function reset() {
    const resetRules = JSON.parse(baseRules);
    chrome.storage.local.set({ performanceRules: JSON.stringify(resetRules) }, function (items) {
      message.success("重置成功");
      setRules(resetRules);
      setShowSave(false);
    });
  }

  function deleteItem(index: number) {
    rules.splice(index, 1);
    setRules([...rules]);
    setShowSave(true);
  }


  function changeVal(type, data, index: number) {
    let _rules = [...rules];
    switch (type) {
      case "text":
        _rules[index].text = data.target.value;
        break;
      case "param0":
        _rules[index].params[0] = data;
        break;
      case "param1":
        _rules[index].params[1] = data;
        break;
    }
    setRules(_rules);
    setShowSave(true);
  }

  return (
    <div className="rule-panel-con">
      <Button type="primary" onClick={addNewRule}>新增自定义指标</Button>
      <div style={{ marginTop: 20 }}>
        <Row className="title-line">
          <Col span={7}>指标名称</Col>
          <Col span={7}>依赖指标1</Col>
          <Col span={7}>依赖指标2</Col>
          <Col span={3} style={{ paddingLeft: 10 }}>操作</Col>
        </Row>
        {rules.map((rule, index) => {
          const { text, params } = rule;
          return (
            <Row style={{ marginBottom: 5 }}>
              <Col span={7}>
                <Input placeholder="名称" value={text} onChange={e => changeVal("text", e, index)} style={{ width: 200 }} />
              </Col>
              <Col span={7}>
                <Select value={params[0]} placeholder="被减数" onChange={val => changeVal("param0", val, index)} style={{ width: 200 }}>
                  {performanceIndicators.map(item => {
                    return <Option value={item}>{item}</Option>
                  })}
                </Select>
              </Col>
              <Col span={7}>
                <Select value={params[1]} placeholder="减数" onChange={val => changeVal("param1", val, index)} style={{ width: 200 }}>
                  {performanceIndicators.map(item => {
                    return <Option value={item}>{item}</Option>
                  })}
                </Select>
              </Col>
              <Col>
                <Button type="link" onClick={() => deleteItem(index)} >删除</Button>
              </Col>
            </Row>
          )
        })}
      </div>
      <div className="button-line">
        {showSave && (<Button type="primary" onClick={save} style={{ marginRight: 30 }}>保存</Button>)}
        <Button type="primary" onClick={reset} >重置</Button>
      </div>
    </div>
  )
}

export default RulePanel;