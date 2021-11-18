<template>
  <node-view-wrapper class="chart">
    <div>
      <vc-donut :thickness="30" has-legend legend-placement="left" :sections="[{ label: 'Pays de la Loire', value: 25 }, { label: 'Nord', value: 25 }, { label: 'Aquitaine', value: 25 }]" :size="100" unit="px"><span style="font-size: 200%">Régions</span></vc-donut>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

}
</script>

<style scoped>
.chart {
  width: 300px;
}
</style>
