export const Options = props => {
  const { title, data, equipos } = props

  return {
    //color: ['#005A94', '#ac4040'],
    // title: {
    //   text: title,
    // },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
        label: {
          // formatter: params => {
          //   return params.axisDimension === 'x'
          //     ? formatDate(params.value, 'DD/MM/YYYY')
          //     : params.value?.toFixed(3)
          // },
        },
      },
      axisPointer: { animation: true },
      // formatter: function (params) {
      //   return `<strong>${formatDate(params[0].data.fecha, 'DD/MM/YYYY')}</strong> <br>
      //   ${params[0].marker} <strong>${params[0].data.stock_alcohol_total?.toFixed(3)} </strong>
      //          `
      // },
    },

    legend: {
      bottom: '2%',
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          type: 'jpg',
          title: 'Descargar',
        },
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        show: false,
        realtime: true,
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: 'time',
      interval: 'day',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: [
      {
        name: 'C°',
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#005A94',
          },
        },
        axisTick: {
          show: false,
        },
        min: function (value) {
          return value.min
        },
        max: function (value) {
          return value.max
        },
      },
      {
        name: 'Estado',
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ac4040',
          },
        },
        axisTick: {
          show: false,
        },
        min: -2,
        max: 2,
      },
    ],

    series: equipos
      .map((equipo, i) => {
        return [
          {
            name: 'C° ' + equipo.name,
            type: 'line',
            showSymbol: false,
            smooth: true,
            datasetIndex: i,
            emphasis: {
              focus: 'series',
            },
            encode: {
              x: 'fecha',
              y: 'temperatura_c1',
            },
            tooltip: {
              valueFormatter: value => value + ' °C',
            },
          },
          {
            name: equipo.name,
            type: 'line',
            showSymbol: false,
            yAxisIndex: 1,
            datasetIndex: i,
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: 'series',
            },
            encode: {
              x: 'fecha',
              y: 'evento',
            },
          },
        ]
      })
      .flat(),

    dataset: equipos.map(equipo => {
      return {
        source: data.filter(row => +row.equipo_id === +equipo.id),
      }
    }),
  }
}
