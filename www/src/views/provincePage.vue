<template>
    <Bar
        v-loading="loading"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
    <div v-loading="loading">
      <el-empty description="暂无数据" v-if="nullData"/>
      <div id="hehe" :style="{ width: width, height: '900px' }"></div>
    </div>
  </template>
  
  <script>
  import shandong from "../assets/geo/shandong.json";
  import anhui from "../assets/geo/anhui.json";
  import zhejiang from "../assets/geo/zhejiang.json";

  import aomen from "../assets/geo/aomen.json";
  import beijing from "../assets/geo/beijing.json";
  import chongqing from "../assets/geo/chongqing.json";

  import fujian from "../assets/geo/fujian.json";
  import gansu from "../assets/geo/gansu.json";
  import guangdong from "../assets/geo/guangdong.json";

  import guangxi from "../assets/geo/guangxi.json";
  import guizhou from "../assets/geo/guizhou.json";
  import hainan from "../assets/geo/hainan.json";

  import hebei from "../assets/geo/hebei.json";
  import heilongjiang from "../assets/geo/heilongjiang.json";
  import henan from "../assets/geo/henan.json";

  import hubei from "../assets/geo/hubei.json";
  import hunan from "../assets/geo/hunan.json";
  import jiangsu from "../assets/geo/jiangsu.json";

  import jiangxi from "../assets/geo/jiangxi.json";
  import jilin from "../assets/geo/jilin.json";
  import liaoning from "../assets/geo/liaoning.json";

  import neimenggu from "../assets/geo/neimenggu.json";
  import ningxia from "../assets/geo/ningxia.json";
  import qinghai from "../assets/geo/qinghai.json";

  import shanghai from "../assets/geo/shanghai.json";
  import shanxi from "../assets/geo/shanxi1.json";
  import shanxi1 from "../assets/geo/shanxi.json";

  import sichuan from "../assets/geo/sichuan.json";
  import taiwan from "../assets/geo/taiwan.json";
  import tianjin from "../assets/geo/tianjin.json";

  import xianggang from "../assets/geo/xianggang.json";
  import xizang from "../assets/geo/xizang.json";
  import yunnan from "../assets/geo/yunnan.json";


  import xinjiang from "../assets/geo/xinjiang.json";


  import * as echarts from "echarts";
import router from "../router/router";
  
  echarts.registerMap("山东省",shandong,{});
  echarts.registerMap("安徽省",anhui,{});
  echarts.registerMap("浙江省",zhejiang,{});
  echarts.registerMap("重庆市",shandong,{});
  echarts.registerMap("福建省",fujian,{});
  echarts.registerMap("甘肃省",gansu,{});
  echarts.registerMap("广东省",guangdong,{});
  echarts.registerMap("广西壮族自治区",guangxi,{});
  echarts.registerMap("贵州省",guizhou,{});
  echarts.registerMap("海南省",hainan,{});
  echarts.registerMap("河北省",hebei,{});
  echarts.registerMap("黑龙江省",heilongjiang,{});
  echarts.registerMap("河南省",henan,{});
  echarts.registerMap("湖北省",hubei,{});
  echarts.registerMap("湖南省",hunan,{});
  echarts.registerMap("江苏省",jiangsu,{});
  echarts.registerMap("江西省",jiangxi,{});
  echarts.registerMap("吉林省",jilin,{});
  echarts.registerMap("辽宁省",liaoning,{});
  echarts.registerMap("内蒙古自治区",neimenggu,{});
  echarts.registerMap("宁夏回族自治区",ningxia,{});
  echarts.registerMap("上海市",shanghai,{});
  echarts.registerMap("青海省",qinghai,{});
  echarts.registerMap("陕西省",shanxi,{});
  echarts.registerMap("山西省",shanxi1,{});
  echarts.registerMap("四川省",sichuan,{});
  echarts.registerMap("台湾省",taiwan,{});
  echarts.registerMap("天津市",tianjin,{});
  echarts.registerMap("香港特别行政区",xianggang,{});
  echarts.registerMap("新疆维吾尔自治区",xinjiang,{});
  echarts.registerMap("西藏自治区",xizang,{});
  echarts.registerMap("云南省",yunnan,{});
  echarts.registerMap("澳门特别行政区",aomen,{});
  echarts.registerMap("北京市",beijing,{});
  echarts.registerMap("重庆市",chongqing,{});
  
  export default {
    name: "StateCases",
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
        stateData: [],
        state: this.$route.params.province,
      }
    },
    created() {
      this.queryData();
    },
    methods: {
      queryData() {
        this.axios.post("api/provinceDetails").then(res => {
          if (res.data.status === 200) {
            this.loading = false
            for (let i = 0; i < 492; i++) {
              const perf = {
                name: res.data.data[i].county,
                value: res.data.data[i].cases,
              };
              this.stateData.push(perf);
            }
            this.setMapData();
          } else {
            // this.nullData = true
          }
        })
      },
      // 地图
      setMapData() {
        // 初始化echarts实例 #D8E9FD
        this.chinaChart = echarts.init(document.getElementById("hehe"));
        // 进行相关配置
        this.chartOption = {
          title: {
            text:  this.state + "疫情地图",
            left: "center",
            textStyle: {
              color: "#000",
              fontSize: "16",
            },
          },
          tooltip: {
            // 鼠标移到图里面的浮动提示框
            // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
            formatter(params) {
              // params.data 就是series配置项中的data数据遍历
              let localValue, deaths, perf;
              if (params.data) {
                localValue = parseFloat(params.data.value);
                deaths = parseFloat(params.data.cases);
              } else {
                // 为了防止没有定义数据的时候报错写的
                localValue = 0;
                deaths = 0;
                perf = 0;
              }
              return `
            <div style='font-size:16px;'> ${params.name}</div>
            <p >
                确诊：${localValue}<br/>
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
            text: ["1000人", "0人"],
            max: 1000,
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
            itemWidth: 15,
          },
          // geo配置详解： https://echarts.baidu.com/option.html#geo
          geo: {
            // 地理坐标系组件用于地图的绘制
            map: this.state, // 表示中国地图
            roam: true, // 是否开启鼠标缩放和平移漫游
            zoom: 1.0, // 当前视角的缩放比例（地图的放大比例）
            //center: [115.97, 29.71],
            scaleLimit: {
              min: 1,
              max: 2
            },
            label: {
              show: true, // 显示地图各省名称
            },
            itemStyle: {
              // 地图区域的多边形图形样式。
              // 未选中的状态
              borderColor: "#000000",
              areaColor: "#ffffff", // 背景颜色
              label: {
                show: true, // 显示名称
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 30,
                shadowColor: "rgba(0, 0, 0, 0.5)",
                borderColor: "rgba(255,99,132,0)",
                areaColor: "#24d62d",
              },
            },
          },
          series: [
            {
              //name: "各省累计确诊人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
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
        this.chinaChart.setOption(this.chartOption);
        this.chinaChart.on('click', function () {
            router.push({path: '/'});
      })
      },
    }
    
  }
  </script>