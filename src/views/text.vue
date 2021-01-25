<template>
  <div>
    <el-card>
      <el-row>
        <span class="margin20 open" v-if="draggable">开启</span>
        <span class="margin20 close" v-else>关闭</span>
      </el-row>
      <el-row>
        <div v-resize="demandResize1">
            <chart
            style="height: 600px; width: 100%"
            @click="handleChartClick"
            ref="chartLoad"
            :options="options"
            ></chart>
        </div>
      </el-row>
    </el-card>
    <el-dialog title="关系图" width="80%" :visible.sync="dialogs.relation">
        <div v-resize="demandResize">
            <chart
                style="height: 600px; width: 100%"
                ref="chartRelation"
                :options="optionsRelation"
            ></chart>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogs.relation = false" size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chart from "vue-echarts/components/ECharts";
import airportData from "@/assets/airport-schedule.json";

const HEIGHT_RATIO = 0.8; //bar高度
const DIM_CATEGORY_INDEX = 0; //尺寸分类索引
const DIM_TIME_ARRIVAL = 1; //抵达时间
const DIM_TIME_DEPARTURE = 2; //起飞时间
const DATA_ZOOM_AUTO_MOVE_THROTTLE = 30; //数据缩放自动移动节流
const DATA_ZOOM_X_INSIDE_INDEX = 1; //数据缩放X内部索引
const DATA_ZOOM_Y_INSIDE_INDEX = 3; //数据缩放Y内部索引
const DATA_ZOOM_AUTO_MOVE_SPEED = 0.2; //数据缩放自动移动速度
const DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH = 30; //数据缩放自动移动检测区域宽度

export default {
  name: "hello",
  components: {
    chart,
  },
  data() {
    return {
      draggable: "", //是否拖动判断
      draggingEl: "", //拖动元素
      dropShadow: "", //拖动阴影
      draggingCursorOffset: [0, 0], //拖动光标偏移
      draggingTimeLength: "", //拖动时间长度
      draggingRecord: "", //拖动记录
      dropRecord: "", //删除记录
      cartesianXBounds: [], //直角 x 边界
      cartesianYBounds: [], //直角 y 边界
      autoDataZoomAnimator: "", //自动数据缩放器
      rawData: "", //原始数据
      options: {}, //echarts 选项
      dialogs: {
        relation: false,
      },
      optionsRelation: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "tree",
            id: 0,
            name: "tree1",
            data: [
              {
                name: "flare",
                children: [
                  {
                    name: "data",
                    children: [
                      {
                        name: "converters",
                        children: [
                          { name: "Converters", value: 721 },
                          { name: "DelimitedTextConverter", value: 4294 },
                        ],
                      },
                      {
                        name: "DataUtil",
                        value: 3322,
                      },
                    ],
                  },
                  {
                    name: "display",
                    children: [
                      { name: "DirtySprite", value: 8833 },
                      { name: "LineSprite", value: 1732 },
                      { name: "RectSprite", value: 3623 },
                    ],
                  },
                  {
                    name: "query",
                    children: [
                      { name: "AggregateExpression", value: 1616 },
                      { name: "And", value: 1027 },
                      { name: "Arithmetic", value: 3891 },
                      { name: "Average", value: 891 },
                      { name: "BinaryExpression", value: 2893 },
                      { name: "Comparison", value: 5103 },
                      { name: "CompositeExpression", value: 3677 },
                      { name: "Count", value: 781 },
                      { name: "DateUtil", value: 4141 },
                      { name: "Distinct", value: 933 },
                      { name: "Expression", value: 5130 },
                      { name: "ExpressionIterator", value: 3617 },
                      { name: "Fn", value: 3240 },
                      { name: "If", value: 2732 },
                      { name: "IsA", value: 2039 },
                      { name: "Literal", value: 1214 },
                      { name: "Match", value: 3748 },
                      { name: "Maximum", value: 843 },
                      {
                        name: "methods",
                        children: [
                          { name: "add", value: 593 },
                          { name: "and", value: 330 },
                          { name: "average", value: 287 },
                          { name: "count", value: 277 },
                          { name: "distinct", value: 292 },
                          { name: "div", value: 595 },
                          { name: "eq", value: 594 },
                          { name: "fn", value: 460 },
                          { name: "gt", value: 603 },
                          { name: "gte", value: 625 },
                          { name: "iff", value: 748 },
                          { name: "isa", value: 461 },
                          { name: "lt", value: 597 },
                          { name: "lte", value: 619 },
                          { name: "max", value: 283 },
                          { name: "min", value: 283 },
                          { name: "mod", value: 591 },
                          { name: "mul", value: 603 },
                          { name: "neq", value: 599 },
                          { name: "not", value: 386 },
                          { name: "or", value: 323 },
                          { name: "orderby", value: 307 },
                          { name: "range", value: 772 },
                          { name: "select", value: 296 },
                          { name: "stddev", value: 363 },
                          { name: "sub", value: 600 },
                          { name: "sum", value: 280 },
                          { name: "update", value: 307 },
                          { name: "variance", value: 335 },
                          { name: "where", value: 299 },
                          { name: "xor", value: 354 },
                          { name: "x_x", value: 264 },
                        ],
                      },
                      { name: "Minimum", value: 843 },
                      { name: "Not", value: 1554 },
                      { name: "Or", value: 970 },
                      { name: "Query", value: 13896 },
                      { name: "Range", value: 1594 },
                      { name: "StringUtil", value: 4130 },
                      { name: "Sum", value: 791 },
                      { name: "Variable", value: 1124 },
                      { name: "Variance", value: 1876 },
                      { name: "Xor", value: 1101 },
                    ],
                  },
                ],
              },
            ],

            top: "1%",
            left: "8%",
            bottom: "1%",
            right: "20%",

            symbolSize: 17,

            edgeShape: "polyline",
            edgeForkPosition: "63%",
            initialTreeDepth: 3,

            lineStyle: {
              width: 2,
            },

            label: {
              backgroundColor: "#fff",
              position: "left",
              verticalAlign: "middle",
              align: "right",
            },

            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left",
              },
            },

            emphasis: {
              focus: "descendant",
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      },
    };
  },
  mounted() {
    //原始数据
    this.rawData = airportData;
    //设置echarts 选项
    this.options = this.makeOption();
    //初始拖拽
    this.initDrag();
  },
  methods: {
    //echarts设置选项
    makeOption() {
      return {
        tooltip: {},
        animation: false,
        toolbox: {
          left: 20,
          top: 0,
          itemSize: 20,
          // iconStyle:{ borderColor: "red" },
          feature: {
            myDrag: {
              show: true,
              title: "Make bars\ndraggable",
              icon:
                "path://M990.55 380.08 q11.69 0 19.88 8.19 q7.02 7.01 7.02 18.71 l0 480.65 q-1.17 43.27 -29.83 71.93 q-28.65 28.65 -71.92 29.82 l-813.96 0 q-43.27 -1.17 -72.5 -30.41 q-28.07 -28.07 -29.24 -71.34 l0 -785.89 q1.17 -43.27 29.24 -72.5 q29.23 -29.24 72.5 -29.24 l522.76 0 q11.7 0 18.71 7.02 q8.19 8.18 8.19 18.71 q0 11.69 -7.6 19.29 q-7.6 7.61 -19.3 7.61 l-518.08 0 q-22.22 1.17 -37.42 16.37 q-15.2 15.2 -15.2 37.42 l0 775.37 q0 23.39 15.2 38.59 q15.2 15.2 37.42 15.2 l804.6 0 q22.22 0 37.43 -15.2 q15.2 -15.2 16.37 -38.59 l0 -474.81 q0 -11.7 7.02 -18.71 q8.18 -8.19 18.71 -8.19 l0 0 ZM493.52 723.91 l-170.74 -170.75 l509.89 -509.89 q23.39 -23.39 56.13 -21.05 q32.75 1.17 59.65 26.9 l47.94 47.95 q25.73 26.89 27.49 59.64 q1.75 32.75 -21.64 57.3 l-508.72 509.9 l0 0 ZM870.09 80.69 l-56.13 56.14 l94.72 95.9 l56.14 -57.31 q8.19 -9.35 8.19 -21.05 q-1.17 -12.86 -10.53 -22.22 l-47.95 -49.12 q-10.52 -9.35 -23.39 -9.35 q-11.69 -1.17 -21.05 7.01 l0 0 ZM867.75 272.49 l-93.56 -95.9 l-380.08 380.08 l94.73 94.73 l378.91 -378.91 l0 0 ZM322.78 553.16 l38.59 39.77 l-33.92 125.13 l125.14 -33.92 l38.59 38.6 l-191.79 52.62 q-5.85 1.17 -12.28 0 q-6.44 -1.17 -11.11 -5.84 q-4.68 -4.68 -5.85 -11.7 q-2.34 -5.85 0 -11.69 l52.63 -192.97 l0 0 Z",
              onclick: this.onDragSwitchClick,
            },
          },
        },
        title: {
          text: "神佑",
          left: "center",
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "weakFilter",
            height: 20,
            bottom: 0,
            start: 0,
            end: 100,
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            showDetail: false,
          },
          {
            type: "inside",
            id: "insideX",
            xAxisIndex: 0,
            filterMode: "weakFilter",
            start: 0,
            end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            zoomLock: false,
            width: 20,
            right: 0,
            top: 70,
            bottom: 20,
            start: 80,
            end: 100,
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "60%",
            showDetail: false,
          },
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            start: 80,
            end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
          },
        ],
        grid: {
          show: true,
          top: 70,
          bottom: 20,
          left: 100,
          right: 20,
          backgroundColor: "#fff",
          borderWidth: 0,
        },
        xAxis: {
          type: "time",
          position: "top",
          splitLine: {
            lineStyle: {
              color: ["#E9EDFF"],
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              color: "#929ABA",
            },
          },
          axisLabel: {
            color: "#929ABA",
            inside: false,
            align: "center",
          },
        },
        yAxis: {
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          min: 0,
          max: this.rawData.parkingApron.data.length,
        },
        series: [
          {
            id: "flightData",
            type: "custom",
            renderItem: this.renderGanttItem,
            dimensions: this.rawData.flight.dimensions,
            encode: {
              x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
              y: DIM_CATEGORY_INDEX,
              tooltip: [
                DIM_CATEGORY_INDEX,
                DIM_TIME_ARRIVAL,
                DIM_TIME_DEPARTURE,
              ],
            },
            // data: this.rawData.flight.data
            data: this.rawDataChange(),
          },
          {
            type: "custom",
            renderItem: this.renderAxisLabelItem,
            dimensions: this.rawData.parkingApron.dimensions,
            encode: {
              x: -1, // 那么这个系列将不受x的控制。
              y: 0,
            },
            data: this.$echarts.util.map(
              this.rawData.parkingApron.data,
              function (item, index) {
                return [index].concat(item);
              }
            ),
          },
        ],
      };
    },
    rawDataChange() {
      let you = [];
      this.rawData.flight.data.forEach((element) => {
        let zhi = {
          name: "hello",
          value: [element[0], element[1], element[2]],
          itemStyle: {
            normal: {
              color: "",
              borderWidth: 0,
              borderColor: "",
            },
          },
        };
        you.push(zhi);
      });
      return you;
    },
    //series 数据渲染器
    renderGanttItem(params, api) {
      let categoryIndex = api.value(DIM_CATEGORY_INDEX);
      let timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex]);
      let timeDeparture = api.coord([
        api.value(DIM_TIME_DEPARTURE),
        categoryIndex,
      ]);

      let coordSys = params.coordSys;

      this.cartesianXBounds[0] = coordSys.y;
      this.cartesianXBounds[1] = coordSys.y + coordSys.height;

      this.cartesianYBounds[0] = coordSys.y;
      this.cartesianYBounds[1] = coordSys.y + coordSys.height;

      let barLength = timeDeparture[0] - timeArrival[0];
      // 得到y轴上长度1对应的高度
      let barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;
      let x = timeArrival[0];
      let y = timeArrival[1] - barHeight;

      let flightNumber = api.value(3) + "";
      let flightNumberWidth = this.$echarts.format.getTextRect(flightNumber)
        .width;
      let text =
        barLength > flightNumberWidth + 40 && x + barLength >= 180
          ? flightNumber
          : "";

      let rectNormal = this.clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength,
        height: barHeight,
      });
      let rectVIP = this.clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength / 2,
        height: barHeight,
      });
      let rectText = this.clipRectByRect(params, {
        x: x,
        y: y,
        width: barLength,
        height: barHeight,
      });
      return {
        type: "group",
        children: [
          {
            type: "rect",
            ignore: !rectNormal,
            shape: rectNormal,
            style: api.style({ fill: "#41B883" }),
          },
          // {
          //     type: 'rect',
          //     ignore: !rectVIP && !api.value(4),
          //     shape: rectVIP,
          //     style: api.style({fill: '#24ACF2'})
          // }, {
          //     type: 'rect',
          //     ignore: !rectText,
          //     shape: rectText,
          //     style: api.style({
          //         fill: 'transparent',
          //         stroke: 'transparent',
          //         text: text,
          //         textFill: '#fff'
          //     })
          // },
          // {
          //     type: 'line',
          //     z2:3,
          //     silent:true,
          //     ignore:!rectText,
          //     shape: {
          //         x1: 111,
          //         y1: 222,
          //         x2: 333,
          //         y2: 444,
          //         percent :[0,1]
          //     },
          //     style: api.style({lineWidth : 5, stroke : "red", fill : 'blue'})
          // }
        ],
      };
    },
    //轴标签 数据渲染器
    renderAxisLabelItem(params, api) {
      let y = api.coord([0, api.value(0)])[1];
      if (y < params.coordSys.y + 5) {
        return;
      }
      return {
        type: "group",
        position: [10, y],
        children: [
          {
            type: "path",
            shape: {
              d: "M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z",
              x: 0,
              y: -20,
              width: 90,
              height: 20,
              layout: "cover",
            },
            style: {
              fill: "#F5DE19",
            },
          },
          {
            type: "text",
            style: {
              x: 24,
              y: -3,
              text: api.value(1),
              textVerticalAlign: "bottom",
              textAlign: "center",
              textFill: "#fff",
            },
          },
          {
            type: "text",
            style: {
              x: 75,
              y: -2,
              textVerticalAlign: "bottom",
              textAlign: "center",
              text: api.value(2),
              textFill: "#000",
            },
          },
        ],
      };
    },
    //剪贴簿
    clipRectByRect(params, rect) {
      return this.$echarts.graphic.clipRectByRect(rect, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      });
    },
    //点击事件
    handleChartClick(params) {
      this.dialogs.relation = true;
      //     this.options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal["borderWidth"] = 10;
      //     this.options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal["borderColor"] = 'red';
    },
    // -------------
    //  启用拖动
    // -------------
    //OnDrag开关点击
    onDragSwitchClick(model, api, type) {
      this.draggable = !this.draggable;
      this.$refs.chartLoad.chart.setOption({
        dataZoom: [
          {
            id: "insideX",
            disabled: this.draggable,
          },
          {
            id: "insideY",
            disabled: this.draggable,
          },
        ],
      });
      //图表样式
      //this.model.setIconStatus(type, this.draggable ? 'emphasis' : 'normal');
      if (this.draggable) {
        this.$refs.chartLoad.chart._model.option.toolbox[0].iconStyle.borderColor =
          "#3E98C5";
      } else {
        this.$refs.chartLoad.chart._model.option.toolbox[0].iconStyle.borderColor =
          "#666";
      }
    },
    //初始化 拖动
    initDrag() {
      this.autoDataZoomAnimator = this.makeAnimator(this.dispatchDataZoom);
      //鼠标按下
      this.$refs.chartLoad.chart.on("mousedown", this.mousedown);
      //鼠标移动
      this.$refs.chartLoad.chart.getZr().on("mousemove", this.mousemove);
      //松开鼠标
      this.$refs.chartLoad.chart.getZr().on("mouseup", this.onMouseup);
      //全部结束
      this.$refs.chartLoad.chart.getZr().on("globalout", this.dragRelease);
    },
    //鼠标按下 动作
    mousedown(param) {
      if (!this.draggable || !param || param.seriesIndex == null) {
        return;
      }
      // 拖动开始
      this.draggingRecord = {
        dataIndex: param.dataIndex,
        categoryIndex: param.value[DIM_CATEGORY_INDEX],
        timeArrival: param.value[DIM_TIME_ARRIVAL],
        timeDeparture: param.value[DIM_TIME_DEPARTURE],
      };
      let style = {
        lineWidth: 2,
        fill: "rgba(255,0,0,0.1)",
        stroke: "rgba(255,0,0,0.8)",
        lineDash: [6, 3],
      };

      this.draggingEl = this.addOrUpdateBar(
        this.draggingEl,
        this.draggingRecord,
        style,
        100
      );
      this.draggingCursorOffset = [
        this.draggingEl.position[0] - param.event.offsetX,
        this.draggingEl.position[1] - param.event.offsetY,
      ];
      this.draggingTimeLength =
        this.draggingRecord.timeDeparture - this.draggingRecord.timeArrival;
    },
    //鼠标移动 动作
    mousemove(event) {
      if (!this.draggingEl) {
        return;
      }
      let cursorX = event.offsetX;
      let cursorY = event.offsetY;

      // 移动 draggingEl.
      this.draggingEl.attr("position", [
        this.draggingCursorOffset[0] + cursorX,
        this.draggingCursorOffset[1] + cursorY,
      ]);

      this.prepareDrop();
      this.autoDataZoomWhenDraggingOutside(cursorX, cursorY);
    },
    //松开鼠标 动作
    onMouseup() {
      // Drop
      if (this.draggingEl && this.dropRecord) {
        this.updateRawData() &&
          this.$refs.chartLoad.chart.setOption({
            series: {
              id: "flightData",
              data: this.rawData.flight.data,
            },
          });
      }
      this.dragRelease();
    },
    //全部结束 动作
    dragRelease() {
      this.autoDataZoomAnimator.stop();

      if (this.draggingEl) {
        this.$refs.chartLoad.chart.getZr().remove(this.draggingEl);
        this.draggingEl = null;
      }
      if (this.dropShadow) {
        this.$refs.chartLoad.chart.getZr().remove(this.dropShadow);
        this.dropShadow = null;
      }
      this.dropRecord = this.draggingRecord = null;
    },
    //新增或者更新bar
    addOrUpdateBar(el, itemData, style, z) {
      let pointArrival = this.$refs.chartLoad.chart.convertToPixel("grid", [
        itemData.timeArrival,
        itemData.categoryIndex,
      ]);
      let pointDeparture = this.$refs.chartLoad.chart.convertToPixel("grid", [
        itemData.timeDeparture,
        itemData.categoryIndex,
      ]);

      let barLength = pointDeparture[0] - pointArrival[0];
      let barHeight =
        Math.abs(
          this.$refs.chartLoad.chart.convertToPixel("grid", [0, 0])[1] -
            this.$refs.chartLoad.chart.convertToPixel("grid", [0, 1])[1]
        ) * HEIGHT_RATIO;

      if (!el) {
        el = new this.$echarts.graphic.Rect({
          shape: { x: 0, y: 0, width: 0, height: 0 },
          style: style,
          z: z,
        });
        this.$refs.chartLoad.chart.getZr().add(el);
      }
      el.attr({
        shape: { x: 0, y: 0, width: barLength, height: barHeight },
        position: [pointArrival[0], pointArrival[1] - barHeight],
      });
      return el;
    },
    //准备投放
    prepareDrop() {
      // 检查可升降位置.
      let xPixel = this.draggingEl.shape.x + this.draggingEl.position[0];
      let yPixel = this.draggingEl.shape.y + this.draggingEl.position[1];
      let cursorData = this.$refs.chartLoad.chart.convertFromPixel("grid", [
        xPixel,
        yPixel,
      ]);
      if (cursorData) {
        // 制作dropshadow和dropRecord
        this.dropRecord = {
          categoryIndex: Math.floor(cursorData[1]),
          timeArrival: cursorData[0],
          timeDeparture: cursorData[0] + this.draggingTimeLength,
        };
        let style = { fill: "rgba(0,0,0,0.4)" };
        this.dropShadow = this.addOrUpdateBar(
          this.dropShadow,
          this.dropRecord,
          style,
          99
        );
      }
    },
    // 原始数据 冲突判断
    updateRawData() {
      let flightData = this.rawData.flight.data;
      let movingItem = flightData[this.draggingRecord.dataIndex];

      // 检查冲突
      for (let i = 0; i < flightData.length; i++) {
        let dataItem = flightData[i];
        if (
          dataItem !== movingItem &&
          this.dropRecord.categoryIndex === dataItem[DIM_CATEGORY_INDEX] &&
          this.dropRecord.timeArrival < dataItem[DIM_TIME_DEPARTURE] &&
          this.dropRecord.timeDeparture > dataItem[DIM_TIME_ARRIVAL]
        ) {
          alert("冲突！找一个空闲的地方安顿一下吧！");
          return;
        }
      }

      //  没有冲突
      movingItem[DIM_CATEGORY_INDEX] = this.dropRecord.categoryIndex;
      movingItem[DIM_TIME_ARRIVAL] = this.dropRecord.timeArrival;
      movingItem[DIM_TIME_DEPARTURE] = this.dropRecord.timeDeparture;
      return true;
    },
    //向外拖动时自动缩放数据
    autoDataZoomWhenDraggingOutside(cursorX, cursorY) {
      //当光标在笛卡尔坐标系外拖动时，
      //自动移动数据区。
      let cursorDistX = this.getCursorCartesianDist(
        cursorX,
        this.cartesianXBounds
      );
      let cursorDistY = this.getCursorCartesianDist(
        cursorY,
        this.cartesianYBounds
      );

      if (cursorDistX !== 0 || cursorDistY !== 0) {
        this.autoDataZoomAnimator.start({
          cursorDistX: cursorDistX,
          cursorDistY: cursorDistY,
        });
      } else {
        this.autoDataZoomAnimator.stop();
      }
    },
    //调度数据缩放
    dispatchDataZoom(params) {
      let option = this.$refs.chartLoad.chart.getOption();
      let optionInsideX = option.dataZoom[DATA_ZOOM_X_INSIDE_INDEX];
      let optionInsideY = option.dataZoom[DATA_ZOOM_Y_INSIDE_INDEX];
      let batch = [];
      this.prepareBatch(
        batch,
        "insideX",
        optionInsideX.start,
        optionInsideX.end,
        params.cursorDistX
      );
      this.prepareBatch(
        batch,
        "insideY",
        optionInsideY.start,
        optionInsideY.end,
        -params.cursorDistY
      );
      batch.length &&
        this.$refs.chartLoad.chart.dispatchAction({
          type: "dataZoom",
          batch: batch,
        });
    },
    //准备批次
    prepareBatch(batch, id, start, end, cursorDist) {
      if (cursorDist === 0) {
        return;
      }
      let sign = cursorDist / Math.abs(cursorDist);
      let size = end - start;
      let delta = DATA_ZOOM_AUTO_MOVE_SPEED * sign;

      start += delta;
      end += delta;

      if (end > 100) {
        end = 100;
        start = end - size;
      }
      if (start < 0) {
        start = 0;
        end = start + size;
      }
      batch.push({
        dataZoomId: id,
        start: start,
        end: end,
      });
    },
    //获取光标笛卡尔距离
    getCursorCartesianDist(cursorXY, bounds) {
      let dist0 =
        cursorXY - (bounds[0] + DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
      let dist1 =
        cursorXY - (bounds[1] - DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH);
      return dist0 * dist1 <= 0
        ? 0 // 光标在笛卡尔坐标系中
        : dist0 < 0
        ? dist0 // 光标位于笛卡尔坐标的左/顶部
        : dist1; // 光标位于笛卡尔坐标系的右/底部
    },
    //制作动画
    makeAnimator(callback) {
      let requestId;
      let callbackParams;
      // 使用节流阀防止频繁调用dispatchAction
      callback = this.$echarts.throttle(callback, DATA_ZOOM_AUTO_MOVE_THROTTLE);

      function onFrame() {
        callback(callbackParams);
        requestId = requestAnimationFrame(onFrame);
      }

      return {
        start: function (params) {
          callbackParams = params;
          if (requestId == null) {
            onFrame();
          }
        },
        stop: function () {
          if (requestId != null) {
            cancelAnimationFrame(requestId);
          }
          requestId = callbackParams = null;
        },
      };
    },
    // 当div发生变化得时候 刷新echars 可以更新echars自动宽度
    demandResize() {
        if (this.$refs.chartRelation) {
            this.$refs.chartRelation.resize();
        }
    },
    // 当div发生变化得时候 刷新echars 可以更新echars自动宽度
    demandResize1() {
        if (this.$refs.chartLoad) {
            this.$refs.chartLoad.resize();
        }
    },
  },
};
</script>

<style>
.margin20 {
  margin-left: 20px;
}
.open {
  color: #3e98c5;
}
.close {
  color: #666;
}
</style>