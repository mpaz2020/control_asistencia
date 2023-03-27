import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import * as echarts from 'echarts'

import { SVGRenderer } from 'echarts/renderers'
import { BarChart, LineChart, GaugeChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  LegendComponent,
  DatasetComponent,
} from 'echarts/components'

use([
  SVGRenderer,
  BarChart,
  LineChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  LegendComponent,
  DatasetComponent,
])

export default ({ app }) => {
  app.component('v-chart', ECharts)
}
