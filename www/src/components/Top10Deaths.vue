<template>
  <div id="rankState" style="width: 23%;height:300px" ref="main">
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: 'Top10Deaths',
  data() {
    return {
      rankData: {
        labels: [],
        datasets: []
      },
    }
  },
  mounted() {
    this.getLeastCases()
  },
  methods: {
    getLeastCases() {
      this.axios.post("api/top10Deaths").then(res => {
        if ((res.data.status === 200)) {
          const json = JSON.stringify(res.data.data)
          this.rankData.labels = JSON.parse(json).map(item => item.state)
          this.rankData.datasets = JSON.parse(json).map(item => item.deaths)
          this.setMapData()
        }
      })
    },
    setMapData() {
      this.rankChart = echarts.init(document.getElementById("rankState"));
      const option = {
        title: {
          text: '累计死亡人数前十地区',
          x: 'center',
          textStyle: {
            color: '#8f9298',
            fontSize: 14
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '5%',
          containLabel: true
        },
        backgroundColor: '',
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            color: '#303133',
            fontSize: '14'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: this.rankData.labels
        }, {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            color: '#303133',
            fontSize: '14',
            formatter: function (value) {
              if (value >= 10000) {
                return (value / 10000).toLocaleString() + '万';
              } else {
                return value.toLocaleString();
              }
            },
          },
          data: this.rankData.datasets
        }],
        series: [{
          name: '次数',
          type: 'bar',
          itemStyle: {
            borderRadius: 0,
            color: '#419fff'
          },
          barWidth: 8,
          data: this.rankData.labels
        },
          {
            name: '背景',
            type: 'bar',
            barWidth: 8,
            barGap: '-100%',
            data: this.rankData.datasets,
            itemStyle: {
              color: '#e44a44',
              borderRadius: 0,
            },
          },
        ]
      };
      this.rankChart.setOption(option);
    },
  }
}
</script>