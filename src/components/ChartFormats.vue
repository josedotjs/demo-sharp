<template>
  <div class="ct-chart ct-perfect-fourth"></div>
</template>

<script>
import 'chartist/dist/chartist.min.css'
import Chartist from 'chartist'
import 'chartist-plugin-pointlabels'
export default {
  props: ['data'],
  computed: {
    formats() {
      return this.data.map(d => `${d.format} ${(d.size).toLocaleString()} bytes`)
    },
    sizes() {
      return this.data.map(d => d.size)
    },
  },
  methods: {
    activateChart() {
      new Chartist.Bar(
        '.ct-chart',
        {
          labels: this.formats,
          series: [this.sizes],
        },
        {
          plugins: [
            Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              align: 'center',
            }),
          ],
          width: '100%',
          height: '100%',
          axisY: {
            labelInterpolationFnc: function(value) {
              const sizeInMB = value / (1024 * 1024)
              const label = `${sizeInMB.toFixed(2)} MB`
              return label
            },
          },
        },
      )
    },
  },
  mounted() {
    this.activateChart()
  },
  watch: {
    data: {
      handler() {
        this.activateChart()
      },
      deep: true,
    },
  },
}
</script>
