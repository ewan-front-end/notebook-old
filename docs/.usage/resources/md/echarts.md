
- 安装 npm i echarts@4.2.1 --save
- 容器 <div id="box" style="width: 500px; height: 300px;"></div>
- 使用： 
    ```
    import echarts from 'echarts'
    var myChart = echarts.init(document.querySelector("#box"))
    var option = {}
    myChart.setOption(option)
    ```

- 基础配置
    title   标题组件
    series  系列列表
    
    grid    直角坐标系内绘图网格。修改图表的大小 
    xAxis   直角坐标系 grid 中的 x 轴
    yAxis   直角坐标系 grid 中的 y 轴

    tooltip 提示框组件
    
    legend  图例组件
    color   调色盘颜色列表
```js
{   
    legend: {
        data: ['bar', 'error'],
        right: 10                                          // 定位
    },
    title: {
        text: 'Girths of Black Cherry Trees',              // 主标题
        subtext: 'By ecStat.histogram',                    // 副标题
        sublink: 'https://github.com/ecomfe/echarts-stat', // 副标题链接
        left: 10,                                          // 定位 数值：距左侧距离 'center'：主副标题全部水平居中 'left'：距左侧0距离主副标题左对齐 'right'：距左侧0距离主副标题右对齐
        right: 10,                                         // 　　 数值：距右侧距离 'center'：主副标题全部水平居中 'left'：距右侧0距离主副标题左对齐 'right'：距右侧0距离主副标题右对齐  
        top: 50,                                           // 　　 数值：距顶部距离 'bottom'：停靠底部 'top'：停靠顶部 
        bottom: 50,                                        // 　　 数值：距底部距离 'bottom'：停靠底部 其它无法识别 
    },
    grid: {
        show:true,                     // 是否显示
        zlevel:0,                      // 所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z:2,                           // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
        // 绘图区域和容器定位(不包括标题 标题单独定位)
        left:"10%",                    // 组件离容器左侧的距离,百分比字符串或整型数字
        top:60,                        // 组件离容器上侧的距离，百分比字符串或整型数字
        right:"auto",                  // 组件离容器右侧的距离,百分比字符串或整型数字
        bottom:"auto",                 // 组件离容器下侧的距离,百分比字符串或整型数字

        width:"auto",                  // 图例宽度
        height:"auto",                 // 图例高度
        containLabel: true,            // grid 区域是否包含坐标轴的刻度标签，
        backgroundColor:"transparent", // 标题背景色
        borderColor:"#ccc",            // 边框颜色
        borderWidth:0,                 // 边框线宽
        shadowColor:"red",             // 阴影颜色
        shadowOffsetX:0,               // 阴影水平方向上的偏移距离
        shadowOffsetY:0,               // 阴影垂直方向上的偏移距离
        shadowBlur:10,                 // 阴影的模糊大小
    },
    tooltip:{                                   // 坐标系特定的 tooltip 设定
        show:true,                              // 是否显示提示框组件，包括提示框浮层和 axisPointer
        trigger:"axis",                         // 触发类型 none不触发 'item' 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis' 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
        position: ['50%', '50%'],               // 提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
        formatter:"{b0}: {c0}<br />{b1}: {c1}", // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
        backgroundColor:"transparent",          // 标题背景色
        borderColor:"#ccc",                     // 边框颜色
        borderWidth:0,                          // 边框线宽
        padding:5,                              // 图例内边距，单位px 5 [5, 10] [5,10,5,10]
        textStyle:mytextStyle,                  // 文本样式
    },
    series: [
        {
            label: {show: true, position: 'top'},  // 节点标签：是否在节点上标值、位置(top/bottom/left/right/inside/insideTop/...insideFill/insideStroke)
            stack: 'area',                         // 如果要和其它series item堆叠在一起 则使用相同的堆叠名
        }
    ]
}
```

===+
data = {
    stack: {}, // 条状图 多个legend 且某些legend要堆叠在一起
    legend: [],
    dataAxis: []
}

const seriesArr = []
legend.forEach(e => {
    seriesArr.push({
        name: e.title,
        data: e.data,
        type: 'bar',
        stack: 'area',
        label: { show: true, position: 'insideTop' },
        itemStyle: { normal: { color: e.color, lineStyle: { color: e.color, width: 2 }}}
        // itemStyle: {
        //   color: new echarts.graphic.LinearGradient(
        //     0, 0, 0, 1,
        //     [
        //       { offset: 0, color: '#bf88f2' },
        //       { offset: 1, color: '#3f39de' }
        //     ]
        //   )
        // }
    })
})
var options = {
    tooltip: { trigger: 'axis' },
    grid: { left: 10, right: 10, bottom: 20, top: 10, containLabel: true },
    xAxis: { type: 'category', data: dataAxis, axisLabel: { interval: 0 }},
    yAxis: { type: 'value' },
    // legend: { data: legendData, right: 'center', bottom: 0 },
    series: seriesArr
}
// if (dataVal.length > 10) options.xAxis.axisLabel.rotate = -45
this.chart.setOption(options)
===-