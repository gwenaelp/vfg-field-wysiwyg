<template>
  <node-view-wrapper class="property">
    <b-tooltip>
      <template slot="content">
        <i class="mdi mdi-key"/>&nbsp;
        {{node.attrs.id}}
      </template>
      <span class="tag">
        {{$parent.$parent[node.attrs.id]}}
      </span>
    </b-tooltip>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  methods: {

  },
}
</script>

<style>
.property {
  display: inline-block;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.5rem;
}
</style>
