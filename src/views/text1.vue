<template>
  <div>
    <el-card>
        <chart style="height:600px;width:100%" v-show="options.show" ref="chartLoad" :options="options" ></chart>
    </el-card>
  </div>
</template>

<script>
import chart from "vue-echarts/components/ECharts";

export default {
  name: "text1",
  components: {
    chart
  },
  data() {
    return {
      axisData : ['周一','周二','周三','很长很长的周四','周五','周六','周日'],
      options:{
          show:false,
          options:{},
      } //echarts 选项
    };
  },
  mounted(){
      //设置echarts 选项
    this.options.options=this.makeOption()
    this.options.show=true
  },
  methods: {
    //echarts设置选项
    makeOption() {
        return {
             title: {
                    text: '笛卡尔坐标系上的 Graph'
                },
                tooltip: {},
                xAxis: {
                    type : 'category',
                    boundaryGap : false,
                    data : this.axisData
                },
                yAxis: {
                    type : 'value'
                },
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        coordinateSystem: 'cartesian2d',
                        symbolSize: 40,
                        label: {
                            show: true
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        data:[],
                        links: this.thLinks(),
                        lineStyle: {
                            color: '#2f4554'
                        }
                    }
                ]
        };
    },
    thData(){ 
        let yyy=this.axisData
        yyy.map(function (item, i) {
            debugger
            let yyy=Math.round(Math.random() * 1000 * (i + 1));
            debugger
        return Math.round(Math.random() * 1000 * (i + 1));
        })
        debugger
    },
    thLinks(){
        let yyy=this.axisData
        yyy.map(function (item, i) {
            debugger
            return {
                source: i,
                target: i + 1
            };
        });
    }
  }
};
</script>

<style>
</style>