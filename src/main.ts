import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeTheme } from '@/composable/useAppearance';

import { use } from "echarts/core";
import {
  CanvasRenderer
} from "echarts/renderers";
import { PieChart } from 'echarts/charts'
import {
  BarChart,
  LineChart
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from "echarts/components";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
]);

import VueECharts from "vue-echarts";

initializeTheme(); // pastikan ini jalan dulu, supaya <html> dapat class `dark`

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('VChart', VueECharts)
app.mount('#app')
