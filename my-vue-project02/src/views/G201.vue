<template>
  <div>
    <div>{{ title }}</div>

    <div class="containers">
      <div id="container01"></div>
      <div id="container02"></div>
      <div id="container03"></div>
      <div id="container04"></div>
      <div id="container05"></div>
      <div id="container06"></div>
      <div id="container07"></div>
      <div id="container08"></div>
      <div id="container09"></div>
      <div id="container10"></div>
      <div id="container11"></div>
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
export default {
  name: 'G201',
  data() {
    return {
      title: 'G2页面一',
      loading: false,
    };
  },
  computed: {},
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.loadContainer01();
      this.loadContainer02();
      this.loadContainer03();
      this.loadContainer04();
      this.loadContainer05();
      this.loadContainer06();
      this.loadContainer07();
      this.loadContainer08();
      this.loadContainer09();
      this.loadContainer10();
      this.loadContainer11();
    }, 2000);
  },
  methods: {
    loadContainer11() {
      const chart = new this.$g2.Chart({
        container: 'container11',
        autoFit: true,
      });

      chart.coordinate({ type: 'radial', endAngle: Math.PI });

      chart
        .interval()
        .data({
          value: [
            { name: 'G', star: 814 },
            { name: 'G2', star: 11425 },
            { name: 'G2Plot', star: 2320 },
            { name: 'S2', star: 968 },
            { name: 'F2', star: 7346 },
            { name: 'L7', star: 2888 },
            { name: 'G6', star: 9314 },
            { name: 'X6', star: 3985 },
            { name: 'AVA', star: 1151 },
          ],
          transform: [{ type: 'sortBy', fields: [['star', true]] }],
        })
        .encode('x', 'name')
        .encode('y', 'star')
        .scale('y', { type: 'sqrt' })
        .encode('color', 'name')
        .encode('size', 40)
        .style('radius', 20)
        .label({
          text: 'star',
          position: 'outside',
          autoRotate: true,
          rotateToAlignArc: true,
          style: {
            dx: 4,
          },
        })
        .axis('x', { title: false })
        .axis('y', false)
        .animate('enter', { type: 'waveIn', duration: 1000 });

      chart.interaction('tooltip');

      chart.title({
        size: 25,
        title: '这是图表标题',
        align: 'center',
      });

      chart.render();
    },
    loadContainer10() {
      const chart = new this.$g2.Chart({
        container: 'container10',
        autoFit: true,
      });

      chart.data({
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
      });

      chart
        .area()
        .transform([
          { type: 'stackY' }, // Try to remove this line.
        ])
        .encode('x', (d) => new Date(d.date))
        .encode('y', 'unemployed')
        .encode('color', 'industry')
        .encode('shape', 'smooth');

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer09() {
      const chart = new this.$g2.Chart({
        container: 'container09',
        autoFit: true,
      });

      chart
        .point()
        .data({
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
        })
        .encode('x', 'height')
        .encode('y', 'weight')
        .encode('color', 'gender');

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer08() {
      const chart = new this.$g2.Chart({
        container: 'container08',
        autoFit: true,
      });

      chart
        .line()
        .data({
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/728a4bdc-9d0b-49e0-a92f-6320a6cddeed.csv',
        })
        .encode('x', 'date')
        .encode('y', 'unemployment')
        .encode('series', 'division')
        .encode('color', 'steelblue');

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer07() {
      const data = [
        {
          Month: 'Jan',
          Evaporation: 2,
          Precipitation: 2.6,
          Temperature: 2,
        },
        {
          Month: 'Feb',
          Evaporation: 4.9,
          Precipitation: 5.9,
          Temperature: 2.2,
        },
        {
          Month: 'Mar',
          Evaporation: 7,
          Precipitation: 9,
          Temperature: 3.3,
        },
        {
          Month: 'Apr',
          Evaporation: 23.2,
          Precipitation: 26.4,
          Temperature: 4.5,
        },
        {
          Month: 'May',
          Evaporation: 25.6,
          Precipitation: 28.7,
          Temperature: 6.3,
        },
        {
          Month: 'Jun',
          Evaporation: 76.7,
          Precipitation: 70.7,
          Temperature: 10.2,
        },
        {
          Month: 'Jul',
          Evaporation: 135.6,
          Precipitation: 175.6,
          Temperature: 20.3,
        },
        {
          Month: 'Aug',
          Evaporation: 162.2,
          Precipitation: 182.2,
          Temperature: 23.4,
        },
        {
          Month: 'Sep',
          Evaporation: 32.6,
          Precipitation: 48.7,
          Temperature: 23,
        },
        {
          Month: 'Oct',
          Evaporation: 20,
          Precipitation: 18.8,
          Temperature: 16.5,
        },
        {
          Month: 'Nov',
          Evaporation: 6.4,
          Precipitation: 6,
          Temperature: 12,
        },
        {
          Month: 'Dec',
          Evaporation: 3.3,
          Precipitation: 2.3,
          Temperature: 6.2,
        },
      ];

      const chart = new this.$g2.Chart({
        container: 'container07',
        autoFit: true,
      });

      chart.data(data);

      chart
        .line()
        .encode('x', 'Month')
        .encode('y', 'Temperature')
        .encode('color', '#EE6666')
        .encode('shape', 'smooth')
        .scale('y', { independent: true, domainMax: 30 })
        .axis('y', {
          title: 'Temperature (°C)',
          grid: null,
          style: {
            titleFill: '#EE6666',
          },
        });

      chart
        .interval()
        .encode('x', 'Month')
        .encode('y', 'Evaporation')
        .encode('color', '#5470C6')
        .scale('y', { independent: true, domainMax: 200 })
        .style('fillOpacity', 0.8)
        .axis('y', {
          position: 'right',
          title: 'Evaporation (ml)',
          style: {
            titleFill: '#5470C6',
          },
        });

      chart
        .line()
        .encode('x', 'Month')
        .encode('y', 'Precipitation')
        .encode('color', '#91CC75')
        .scale('y', { independent: true })
        .style('lineWidth', 2)
        .style('lineDash', [2, 2])
        .axis('y', {
          position: 'right',
          title: 'Precipitation (ml)',
          grid: null,
          style: {
            titleFill: '#91CC75',
          },
        });

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer06() {
      const chart = new this.$g2.Chart({
        container: 'container06',
        autoFit: true,
      });

      chart
        .line()
        .data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/temperatures2.json',
        })
        .scale('x', { utc: true })
        .scale('y', { nice: true })
        .scale('color', { type: 'sequential', palette: 'turbo' })
        .encode('x', (d) => new Date(d.date))
        .encode('y', 'value')
        .encode('shape', 'hvh')
        .encode('color', 'value')
        .encode('series', () => undefined)
        .style('gradient', 'y')
        .style('lineWidth', 2)
        .style('lineJoin', 'round')
        .axis('x', { title: 'date' });

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer05() {
      const chart = new this.$g2.Chart({
        container: 'container05',
        autoFit: true,
      });

      chart
        .interval()
        .data({
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
          format: 'csv',
        })
        .transform({ type: 'stackY' })
        .transform({ type: 'sortX', by: 'y', reverse: true })
        .encode('x', 'state')
        .encode('y', 'population')
        .encode('color', 'age')
        .axis('x', {
          labelSpacing: 4,
          style: {
            labelTransform: 'rotate(90deg)',
          },
        })
        .axis('y', { labelFormatter: '~s' });

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer04() {
      const chart = new this.$g2.Chart({
        container: 'container04',
        autoFit: true,
        paddingLeft: 60,
      });

      chart
        .interval()
        .data([
          { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
          { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
          { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
          { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
          { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
          { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
          { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
          { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
          { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
          { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
          { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
          { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
          { month: 'Total', start: 0, end: 3164946 },
        ])
        .encode('x', 'month')
        .encode('y', ['end', 'start'])
        .encode('color', (d) => (d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease'))
        .axis('y', { labelFormatter: '~s' });

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer03() {
      const chart = new this.$g2.Chart({
        container: 'container03',
        autoFit: true,
      });

      chart.coordinate({ transform: [{ type: 'transpose' }] });

      chart
        .interval()
        .data({
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
          transform: [
            {
              type: 'filter',
              callback: (d) => d.year === 1850,
            },
          ],
        })
        .encode('x', 'age')
        .encode('y', (d) => (d.sex === 1 ? -d.people : d.people))
        .encode('color', 'sex')
        .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
        .axis('y', { labelFormatter: '~s' })
        .scale('x', { range: [1, 0] });

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer02() {
      const chart = new this.$g2.Chart({
        container: 'container02',
        autoFit: true,
      });

      chart.coordinate({ transform: [{ type: 'transpose' }] });

      chart
        .interval()
        .data([
          { genre: '小明', sold: 275 },
          { genre: '小张', sold: 115 },
          { genre: '张三', sold: 120 },
          { genre: '李四', sold: 350 },
          { genre: '王五', sold: 150 },
        ])
        .encode('x', 'genre')
        .encode('y', 'sold')
        .encode('color', 'genre');

      chart.interaction('tooltip');

      chart.render();
    },
    loadContainer01() {
      const chart = new this.$g2.Chart({
        container: 'container01',
        autoFit: true,
      });

      chart
        .interval()
        .data([
          { genre: '小明', sold: 275 },
          { genre: '小张', sold: 115 },
          { genre: '张三', sold: 120 },
          { genre: '李四', sold: 350 },
          { genre: '王五', sold: 150 },
        ])
        .encode('x', 'genre')
        .encode('y', 'sold')
        .encode('color', 'genre');

      chart.interaction('tooltip');

      chart.render();
    },
  },
  created() {},
};
</script>

<style >
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
  width: 100%;
  flex-wrap: wrap;
}

.containers > div {
  display: flex;
  margin: 1rem;
  width: 40%;
  height: 400px;
}
</style>
