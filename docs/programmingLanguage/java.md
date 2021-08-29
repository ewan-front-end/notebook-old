---
pageClass: theme-item
---
<div class="extend-header">
    <div class="info">
        <div class="record">
            <a class="back" href="./">上一级</a>
            <a class="back" href="./">返回</a>
        </div>        
        <div class="mini">
            <span>M 0000:00:00 00:00</span>
        </div>
    </div>
    <div class="content"></div>
</div>
<div class="content-header">
<h1>Java</h1><strong>Java</strong>
</div>
<div class="static-content">

## Java环境
- 安装JDK
    http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html   jdk-16.0.1_windows-x64_bin.exe
- 配置环境变量

<pre class="code-block">
data = {
    stack: {},<span class="comment"> // 条状图 多个legend 且某些legend要堆叠在一起</span>
    legend: [],
    dataAxis: []
}

const seriesArr = []
legend.forEach(e =&gt; {
    seriesArr.push({
        name: e.title,
        data: e.data,
        type: 'bar',
        stack: 'area',
        label: { show: true, position: 'insideTop' },
        itemStyle: { normal: { color: e.color, lineStyle: { color: e.color, width: 2 <img :src="$withBase('/images/db-brace-right.png')">}
       <span class="comment"> // itemStyle: {</span>
       <span class="comment"> //   color: new echarts.graphic.LinearGradient(</span>
       <span class="comment"> //     0, 0, 0, 1,</span>
       <span class="comment"> //     [</span>
       <span class="comment"> //       { offset: 0, color: '#bf88f2' },</span>
       <span class="comment"> //       { offset: 1, color: '#3f39de' }</span>
       <span class="comment"> //     ]</span>
       <span class="comment"> //   )</span>
       <span class="comment"> // }</span>
    })
})
var options = {
    tooltip: { trigger: 'axis' },
    grid: { left: 10, right: 10, bottom: 20, top: 10, containLabel: true },
    xAxis: { type: 'category', data: dataAxis, axisLabel: { interval: 0 <img :src="$withBase('/images/db-brace-right.png')">,
    yAxis: { type: 'value' },
   <span class="comment"> // legend: { data: legendData, right: 'center', bottom: 0 },</span>
    series: seriesArr
}<span class="comment">
// if (dataVal.length &gt; 10) options.xAxis.axisLabel.rotate = -45</span>
this.chart.setOption(options)
</pre>8

</div>