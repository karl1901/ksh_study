<template>
  <div>
    <div>{{ title }}</div>

    <div class="containers">
      <div v-for="(cl, index) in loadAllFunDoms()" :key="index" :id="cl"></div>
    </div>

    <div v-show="loading" class="loadings">
      <div>
        <div>
          <img src="/imgs/loading_tree.png" />
        </div>
        <div>
          <span>loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as g2plot from '@antv/g2plot';
import { last } from '@antv/util';
export default {
  name: 'G2plot01',
  data() {
    return {
      title: 'G2plot页面一',
      loading: false,
    };
  },
  computed: {},
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.loadAllFun();
    }, 2000);
  },
  methods: {
    loadContainer12() {
      Promise.all([
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json').then((res) => res.json()),
        fetch('https://gw.alipayobjects.com/os/antfincdn/ICk9dCBRyL/facet-data.json').then((res) => res.json()),
      ]).then(([sourceData, datas]) => {
        const plot = new g2plot.Facet('container12', {
          appendPadding: [0, 18, -50, 32],
          data: sourceData,
          type: 'tree',
          fields: ['clarity'],
          meta: {
            cut: {
              sync: true,
              // 手动进行排序，保证颜色映射正确
              values: ['Ideal', 'Good', 'Premium', 'Very-Good', 'Fair'],
            },
            mean: {
              sync: true,
              tickCount: 5,
              formatter: (v) => `${Math.ceil(v)}`,
            },
          },
          // tree-facet 连接线样式和是否平滑
          line: {
            style: {
              stroke: '#dedede',
            },
            smooth: true,
          },
          axes: {},
          tooltip: { showMarkers: false },
          eachView: (view, facet) => {
            const { rowIndex } = facet || {};
            const facetData = datas[rowIndex];
            if (rowIndex === 0) {
              return {
                type: 'pie',
                options: {
                  data: facetData,
                  meta: {
                    mean: {
                      // 关闭饼图 'mean'字段的 scale 同步
                      sync: false,
                    },
                  },
                  angleField: 'mean',
                  colorField: 'cut',
                  radius: 1,
                  pieStyle: { stroke: null },
                  // 添加动画
                  animation: {},
                  // 添加交互
                  interactions: [{ type: 'element-active' }],
                },
              };
            }
            return {
              type: 'column',
              options: {
                data: facetData,
                meta: {
                  mean: {
                    // 关闭饼图 'mean'字段的 scale 同步
                    sync: rowIndex === 0 ? false : true,
                  },
                },
                xField: 'cut',
                yField: 'mean',
                seriesField: 'cut',
                columnStyle: { fillOpacity: 0.85 },
                // 添加动画
                animation: {},
                // 添加交互
                interactions: [{ type: 'element-active' }, { type: 'active-region' }],
              },
            };
          },
        });

        plot.render();
      });
    },
    loadContainer11() {
      const plot = new g2plot.Venn('container11', {
        data: [
          { sets: ['A'], size: 12, label: 'A' },
          { sets: ['B'], size: 12, label: 'B' },
          { sets: ['C'], size: 12, label: 'C' },
          { sets: ['A', 'B'], size: 2, label: 'A&B' },
          { sets: ['A', 'C'], size: 2, label: 'A&C' },
          { sets: ['B', 'C'], size: 2, label: 'B&C' },
          { sets: ['A', 'B', 'C'], size: 1 },
        ],
        setsField: 'sets',
        sizeField: 'size',
        pointStyle: { fillOpacity: 0.8 },
        padding: [0, 10],
        interactions: [
          { type: 'venn-element-active', enable: true },
          { type: 'venn-element-selected', enable: true },
        ],
      });
      plot.render();
    },
    loadContainer10() {
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
      ];

      const rosePlot = new g2plot.Rose('container10', {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        legend: {
          position: 'bottom',
        },
        interactions: [{ type: 'element-active' }],
      });

      rosePlot.render();
    },
    loadContainer09() {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json')
        .then((res) => res.json())
        .then((data) => {
          const scatterPlot = new g2plot.Scatter('container09', {
            appendPadding: 30,
            data,
            xField: 'xG conceded',
            yField: 'Shot conceded',
            colorField: 'Result',
            size: 5,
            shape: 'circle',
            pointStyle: {
              fillOpacity: 1,
            },
            yAxis: {
              nice: true,
              line: {
                style: {
                  stroke: '#aaa',
                },
              },
            },
            xAxis: {
              grid: {
                line: {
                  style: {
                    stroke: '#eee',
                  },
                },
              },
              line: {
                style: {
                  stroke: '#aaa',
                },
              },
            },
            label: {},
          });
          scatterPlot.render();
        });
    },
    loadContainer08() {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
        .then((res) => res.json())
        .then((data) => {
          const plot = new g2plot.Sunburst('container08', {
            data,
            innerRadius: 0.2,
            radius: 1,
            interactions: [{ type: 'element-active' }],
            hierarchyConfig: {
              field: 'sum',
            },
            label: {
              // label layout: limit label in shape, which means the labels out of shape will be hide
              layout: [{ type: 'limit-in-shape' }],
            },
          });
          plot.render();
        });
    },
    loadContainer07() {
      fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
        .then((data) => data.json())
        .then((data) => {
          const radarPlot = new g2plot.Radar('container07', {
            data,
            xField: 'item',
            yField: 'score',
            seriesField: 'user',
            meta: {
              score: {
                alias: '分数',
                min: 0,
                max: 80,
              },
            },
            xAxis: {
              line: null,
              tickLine: null,
              grid: {
                line: {
                  style: {
                    lineDash: null,
                  },
                },
              },
            },
            // 开启面积
            area: {},
            // 开启辅助点
            point: {
              size: 2,
            },
          });
          radarPlot.render();
        });
    },
    loadContainer06() {
      const liquidPlot = new g2plot.Liquid(document.getElementById('container06'), {
        percent: 0.26,
        radius: 0.8,
        statistic: {
          title: {
            formatter: () => '盈利率',
            style: ({ percent }) => ({
              fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
            }),
          },
          content: {
            style: ({ percent }) => ({
              fontSize: 60,
              lineHeight: 1,
              fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
            }),
            customHtml: (container, view, { percent }) => {
              const { width, height } = container.getBoundingClientRect();
              const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
              const text = `占比 ${(percent * 100).toFixed(0)}%`;
              const textWidth = g2plot.measureTextWidth(text, { fontSize: 60 });
              const scale = Math.min(d / textWidth, 1);
              return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
                scale <= 1 ? 1 : 'inherit'
              }">${text}</div>`;
            },
          },
        },
        liquidStyle: ({ percent }) => {
          return {
            fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
            stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
          };
        },
        color: () => '#5B8FF9',
      });
      liquidPlot.render();

      let data = 0.25;
      const interval = setInterval(() => {
        data += Math.min(Math.random() * 0.1, 0.1);
        if (data < 0.75) {
          liquidPlot.changeData(data);
        } else {
          clearInterval(interval);
        }
      }, 500);
    },
    loadContainer05() {
      const divStyles = {
        position: 'absolute',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: 'rgb(174, 174, 174) 0px 0px 10px',
        borderRadius: '4px',
      };

      const setStyles = (container, styles) => {
        for (const key in styles) {
          container.style[key] = styles[key];
        }
      };

      fetch('https://gw.alipayobjects.com/os/bmw-prod/5a209bb2-ee85-412f-a689-cdb16159a459.json')
        .then((data) => data.json())
        .then((data) => data.filter((d) => ['United States', 'France', 'Germany', 'Austria', 'Japan', 'Sweden'].includes(d.country)))
        .then((data) => {
          const line = new g2plot.Line('container05', {
            padding: 'auto',
            appendPadding: [8, 10, 0, 10],
            data,
            xField: 'year',
            yField: 'value',
            seriesField: 'country',
            smooth: true,
            lineStyle: ({ country }) => {
              const importantCountries = ['United States', 'France', 'Germany'];
              const idx = importantCountries.indexOf(country);
              return { lineWidth: idx !== -1 ? 2 : 1 };
            },
            interactions: [{ type: 'brush' }],
            tooltip: {
              follow: true,
              enterable: true,
              offset: 18,
              shared: true,
              marker: { lineWidth: 0.5, r: 3 },
            },
          });

          line.render();

          const createPie = (container, data) => {
            const piePlot = new g2plot.Pie(container, {
              data,
              width: 120,
              height: 120,
              appendPadding: 10,
              autoFit: false,
              angleField: 'value',
              colorField: 'type',
              legend: false,
              tooltip: false,
              animation: false,
              color: line.chart.themeObject.colors10,
              label: {
                type: 'inner',
                offset: '-10%',
                content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
              },
            });
            piePlot.render();
          };
          line.update({
            tooltip: {
              customContent: (value, items) => {
                const pieData = items.map((item) => ({
                  type: item.name,
                  value: Number(item.value),
                }));
                const container = document.createElement('div');
                const pieContainer = document.createElement('div');
                setStyles(container, divStyles);
                createPie(pieContainer, pieData);
                container.appendChild(pieContainer);
                return container;
              },
            },
          });
          // 初始化，默认激活
          const point = line.chart.getXY(last(data.filter((d) => !!d.value)));
          line.chart.showTooltip(point);
        });
    },
    loadContainer04() {
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
      ];

      const piePlot = new g2plot.Pie('container04', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [{ type: 'element-active' }],
      });

      piePlot.render();
      setInterval(() => {
        piePlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
      }, 1200);
    },
    loadContainer03() {
      const data = [
        { type: '1-3秒', value: 0.16 },
        { type: '4-10秒', value: 0.125 },
        { type: '11-30秒', value: 0.24 },
        { type: '31-60秒', value: 0.19 },
        { type: '1-3分', value: 0.22 },
        { type: '3-10分', value: 0.05 },
        { type: '10-30分', value: 0.01 },
        { type: '30+分', value: 0.015 },
      ];

      const paletteSemanticRed = '#F4664A';
      const brandColor = '#5B8FF9';
      const columnPlot = new g2plot.Column('container03', {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'value',
        color: ({ value }) => {
          if (value < 0.05) {
            return paletteSemanticRed;
          }
          return brandColor;
        },
        legend: false,
      });

      columnPlot.render();
      setInterval(() => {
        columnPlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
      }, 1200);
    },
    loadContainer02() {
      function getData() {
        const data = [];
        const time = new Date().getTime();

        for (let i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random() + 0.2,
          });
        }
        return data;
      }

      const line = new g2plot.Line('container02', {
        data: getData(),
        padding: 'auto',
        xField: 'x',
        yField: 'y',
        xAxis: {
          type: 'time',
          mask: 'HH:mm:ss',
        },
        smooth: true,
        point: {},
      });

      line.render();

      setInterval(() => {
        const x = new Date().getTime(), // current time
          y = Math.random() + 0.2;
        const newData = line.options.data.slice(1).concat({ x, y });
        line.changeData(newData);
      }, 1000);
    },
    loadContainer01() {
      const color = ['#F4664A', '#FAAD14', '#30BF78'];
      const getColor = (percent) => {
        return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
      };
      const gauge = new g2plot.Gauge('container01', {
        percent: 0.2,
        range: {
          color: getColor(0.2),
        },
        indicator: {
          pointer: {
            style: {
              stroke: '#D0D0D0',
            },
          },
          pin: {
            style: {
              stroke: '#D0D0D0',
            },
          },
        },
        axis: {
          label: {
            formatter(v) {
              return Number(v) * 100;
            },
          },
          subTickLine: {
            count: 3,
          },
        },
        statistic: {
          content: {
            formatter: ({ percent }) => (percent >= 1 ? '已完成' : `完成进度: ${(percent * 100).toFixed(0)}%`),
          },
          style: {
            fontSize: 60,
          },
        },
        animation: false,
      });

      gauge.render();

      let data = 0.2;
      const interval = setInterval(() => {
        if (data >= 1) {
          clearInterval(interval);
        } else {
          data += 0.01;
          gauge.changeData(data);
          gauge.update({ range: { color: getColor(data) } });
        }
      }, 100);
    },
    loadFunList() {
      return [
        this.loadContainer01,
        this.loadContainer02,
        this.loadContainer03,
        this.loadContainer04,
        this.loadContainer05,
        this.loadContainer06,
        this.loadContainer07,
        this.loadContainer08,
        this.loadContainer09,
        this.loadContainer10,
        this.loadContainer11,
        this.loadContainer12,
      ];
    },
    loadAllFun() {
      this.loadFunList().forEach((fl) => {
        fl();
      });
    },
    loadAllFunDoms() {
      let list = [];
      this.loadFunList().forEach((e) => {
        let str = e.name.substring(e.name.indexOf('C')).toLowerCase();
        list.push(str);
      });
      return list;
    },
  },
  created() {},
};
</script>

<style>
body {
  background-image: url('https://bpic.588ku.com/back_our/20210530/bg/3b0e1debfbc7df02479f5fc23240214c_10236.png');
  background-size: cover;
  color: white;
}

.loadings {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
  top: 0%;
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}

.loadings img {
  width: 200px;
  height: 200px;
}

.containers {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
}

.containers > div {
  display: flex;
  margin: 1rem;
  width: 25%;
  height: 300px;
  background: linear-gradient(to left, #2cd5ff, #2cd5ff) left top no-repeat, linear-gradient(to bottom, #2cd5ff, #2cd5ff) left top no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) right top no-repeat, linear-gradient(to bottom, #2cd5ff, #2cd5ff) right top no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) left bottom no-repeat, linear-gradient(to bottom, #2cd5ff, #2cd5ff) left bottom no-repeat,
    linear-gradient(to left, #2cd5ff, #2cd5ff) right bottom no-repeat, linear-gradient(to left, #2cd5ff, #2cd5ff) right bottom no-repeat;
  background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
  border: 1px solid #073f97;
  padding: 1rem;
  box-shadow: -0.01rem 0.06rem 0.5rem 0.2rem rgba(206, 206, 206, 0.774);
}
</style>
