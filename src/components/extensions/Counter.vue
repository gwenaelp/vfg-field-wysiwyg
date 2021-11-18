<template>
  <node-view-wrapper class="counter">
    <div>
      <span class="label">
        Compteur : {{ node.attrs.count }}
      </span>
      <a class="button is-primary" @click="increase">
        +1
      </a>
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

  methods: {
    increase() {
      this.updateAttributes({
        count: this.node.attrs.count + 1,
      })
    },
  },
}
</script>

<style>
.counter > div {
  display: inline-block;
  background-color: #0D0D0D;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.5rem;
}

.label {
  display: inline-block;
  color: #fff;
  margin-top: 3px;
  margin-bottom: 0px!important;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

</style>
