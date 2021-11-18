<template>
  <div class="menu">
    <ul class="menu-list">
      <li
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
      >
        <a
          @click="selectItem(index)"
          @mouseenter="typeof getItem(item) === 'object' ? scannedPath = item : scannedPath = undefined"
        >
          <i :class="`mdi mdi-${iconForType(typeof getItem(item))}`" />&nbsp;
          {{ item }}
          <span style="float: right" v-if="typeof getItem(item) === 'object'">
            <i class="mdi mdi-chevron-right" />
          </span>
        </a>
      </li>
    </ul>
    <span class="sub-menu" v-if="scannedPath">
      <PropertyList :items="Object.keys(getItem(scannedPath))" :command="command" :listRoot="listRoot ? listRoot + '.' + scannedPath : scannedPath" />
    </span>
  </div>
</template>
<script>
import scanComponentVars from '@/core/utils/scanComponentVars';
import getProp from '@/core/utils/getProp';

export default {
  name: 'PropertyList',
  props: {
    listRoot: {
      type: String,
      default: '',
    },
    scannedComponent: {
      type: Object,
      default: undefined,
    },
    items: {
      type: Array,
      default: () => []
    },
    query: {
      type: String,
      default: ''
    },
    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      scanComponentVars,
      selectedIndex: 0,
      scannedPath: undefined,
    }
  },
  computed: {
    scannedComponentWithSafety () {
      const res = this.scannedComponent || this.$parent.$parent;
      return res;
    }
  },
  watch: {
    items() {
      this.selectedIndex = 0;
    },
  },

  methods: {
    getItem(item) {
      const itemPath = this.listRoot !== '' ? this.listRoot + '.' + item : item;
      return getProp(this.scannedComponentWithSafety, itemPath);
    },
    iconForType (type) {
      const types = {
        object: 'code-json',
        boolean: 'check',
        string: 'format-letter-case',
        number: 'numeric',
        undefined: 'square-off-outline',
        null: 'square-off-outline'
      };
      return types[type] || type;
    },
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index];

      if (item) {
        if (this.listRoot !== '') {
          this.command({ id: this.listRoot + '.' + item });
        } else {
          this.command({ id: item });
        }
      }
    },
  },
}
</script>
<style scoped>
  .menu {
    background: white;
    position:  relative;
    width: 210px;
  }
  .sub-menu {
    position: absolute;
    left: 200px;
    top: 0;
  }
  .is-selected {
    background: var(--primary-color);
    color: white;
  }
  ul {
    list-style: none;
    margin:  0;
  }
</style>
