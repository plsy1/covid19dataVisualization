<template>
  <div v-loading="loading">
    <el-empty description="暂无数据" v-if="nullData"/>
    <div id="USA" :style="{ width: width, height: '930px' }"></div>
  </div>
</template>

<script>
import USA from "../assets/geo/china.json";
import * as echarts from "echarts";
import router from "../router/router.js";

echarts.registerMap("USA", USA, {
});

export default {
  name: "StateDeaths",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      casesDisplay: false,
      deathsDisplay: false,
      rateDisplay: false,
      loading: true,
      nullData: false,
      stateData: []
    }
  },
  created() {
    this.queryData();
  },
  methods: {
    queryData() {
      this.axios.post("api/deathRate").then(res => {
        if (res.data.status === 200) {
          this.loading = false
          for (let i = 0; i < 33; i++) {
            const perf = {
              name: res.data.data[i].state,
              value: res.data.data[i].deaths,
            };
            this.stateData.push(perf);
          }
          this.setMapData();
        } else {
          this.nullData = true
        }
      })
    },
    setMapData() {
      // 初始化echarts实例
      this.usaChart = echarts.init(document.getElementById("USA"));
      // 进行相关配置
      this.chartOption = {
        backgroundColor: "",
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
          formatter(params) {
            let localValue, deaths, perf;
            if (params.data) {
              localValue = parseFloat(params.data.value);
            } else {
              localValue = 0;
              deaths = 0;
              perf = 0;
            }
            return `
          <div style='font-size:16px;'> ${params.name}</div>
          <p >
              死亡：${localValue}<br/>
          </p>
        `;
          },
        },
        borderColor: "#fff",
        visualMap: {
          type: "continuous",
          show: true,
          bottom: 0,
          right: 0,
          text: ["30人", "0人"],
          max: 30,
          min: 0,
          inRange: { //定义 在选中范围中 的视觉元素
            color: [
              "#fdfdfd",
              "#fdf0cd",
              "#fbd09f",
              "#fd8b70",
              "#e44a44",
              "#bc1316",
              "#7e1100",
            ],
            symbolSize: [0, 70]
          },
          itemHeight: 200,
          itemWidth: 15
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "USA", // 表示中国地图
          roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.0, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: true, // 显示地图各省名称
          },          
          scaleLimit: {
            min: 1,
            max: 2
          },
          itemStyle: {
            // 地图区域的多边形图形样式。
            //未选中的状态
            borderColor: "#000000",
            areaColor: "#ffffff", //背景颜色
            label: {
              show: true, //显示名称
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              borderColor: "rgba(255,99,132,0)",
              areaColor: "#24d62d",
            },
          },
        },
        series: [
          {
            // name: "各州累计死亡人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            label: {
              show: true,
            },
            data: this.stateData
          },
        ],
      };
      // 使用刚指定的配置项和数据显示地图数据
      this.usaChart.setOption(this.chartOption);
      this.usaChart.on('click', function (stateData) {
        router.push({path: '/' + stateData.data.name});
      })
    },
  }
}
</script>