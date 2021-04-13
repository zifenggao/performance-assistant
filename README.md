# Performance Assistant

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/monitor-icon-chrome.png" style="zoom: 33%;" />

Chrome**页面加载性能监控插件**。提供最简单的查看页面加载性能的方式和指标定制化的能力，支持持续监控，可以查看页面一段时间内的加载性能数据变化。

## 安装方法

通过chrome加载已解压的扩展程序，选择项目中的build文件夹即可。

## 开始使用

### 简单查看数据

刷新页面之后，点击右上角插件icon，可以查看加载性能数据如下：

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/20210414010118.png" style="width: 600px" />

点击加号可以查看计算指标依赖的数据：（指标都是按照performance.timing属性值来的，具体可参考[《Navigation Timing》](https://www.w3.org/TR/2012/REC-navigation-timing-20121217/#sec-navigation-timing-interface)）

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/20210414010330.png" style="width: 300px" />

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/20210414012711.png" style="width: 600px" />

### 自定义指标

由于不同应用场景，对指标的定义可能不同，插件也提供了自定义指标的能力，可以打开开发者工具，选择Performance assistant这个tab，进行更多操作。包括新增自定义指标，删除已有指标，或者对已有默认指标进行编辑。当然你也不用担心会改乱掉，点击下方的重置按钮就能让所有指标恢复默认值：

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/20210414013354.png" style="width: 600px" />

### 性能数据可视化

勾选“持续监控”后，刷新页面，插件会记录每一次页面加载后的数据，并呈现可视化图表方便观察变化趋势：

<img src="http://qiniu.xiaozi1931.com/qiniu_picGo/20210414012423.png" style="width: 600px" />
