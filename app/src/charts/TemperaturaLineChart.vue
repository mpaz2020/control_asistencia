<template>
  <v-chart class="chart" :loading="loading" :option="option" autoresize />
</template>

<script setup>
import useModalTemperatura from '../composables/modal-temperatura'
import { computed } from 'vue'
import { Options } from '../charts/options/temperatura-line-option'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  dateSelection: {
    type: Object,
    required: true,
  },
})

const { loading, data } = useModalTemperatura()

const option = computed(() => Options({ ...props, data: data.value }))
</script>
<style lang="scss" scoped>
.chart {
  // min-height: 470px;
  // height: calc(100vh - 270px);
}
</style>
