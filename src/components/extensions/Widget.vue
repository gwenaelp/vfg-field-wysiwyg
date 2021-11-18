<template>
  <node-view-wrapper class="widget">
    <PanelEditionDropdowns :panel="panel" />
    <div class="block-wrapper" v-if="Object.keys(panelConfig).length">
      <ArrayBlock :config="panelConfig" hideEditButton />
    </div>
    <div v-else class="widget-settings">
      <b>Paramètres du widget</b>
      <div :style="isPortalActive ? 'height:100%': 'height: 60px'">
        <portal-target name="portalComplexField" @change="isPortalActive = $event" :style="isPortalActive ? 'height:100%': ''"/>
      </div>
      <vue-form-generator
        ref="form"
        :schema="widgetSchema"
        :model="panelConfigVolatile"
        tag="div"
      />
      <a class="button is-primary" @click="save">
        <i class="mdi mdi-check" />&nbsp;
        Enregistrer
      </a>
    </div>
  </node-view-wrapper>
</template>
<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import ArrayBlock from '@/components/blocks/Array';
import PanelEditionDropdowns from '@/components/PanelEditionDropdowns';

export default {
  components: {
    NodeViewWrapper,
    ArrayBlock,
    PanelEditionDropdowns,
  },

  props: nodeViewProps,

  data () {
    return {
      isPortalActive: false,
      panelConfigVolatile: {},
      widgetSchema: {
        fields: [{
          type: 'collection',
          model: 'collection',
          label: 'Collection'
        }, {
          label: 'Type des éléments',
          model: 'schema',
          type: 'document',
          labelField: 'name',
          relation: {
            type: 'hasOne',
            collection: 'schemas',
          },
          bucket: 'schema',
          onlyFieldAsString: 'name',
          hint: "Nom du schéma, utilisé pour gérer le formulaire d'édition des enregistrements",
          canCreateNewDocument: true,
        }]
      }
    };
  },
  computed: {
    panelConfig: {
      get () {
        if (this.node.attrs.panelConfig) {
          try {
            return JSON.parse(this.node.attrs.panelConfig);
          } catch (e) {
            return {};
          }
        }
      },
      set (v) {
        this.node.attrs.panelConfig = JSON.stringify(v);
      }
    }
  },
  methods: {
    save () {
      this.panelConfig = this.panelConfigVolatile;
    }
  },
}
</script>

<style scoped>
.widget {
  border:  1px solid #ccc;
  margin-left: 20px;
}
.block-wrapper {
  overflow-y: auto;
}
.widget-settings {
  min-height: 400px;
  padding: 20px;
  overflow-y: auto;
}
.widget >>> .panel-title-bar-wrapper {
  height: 50px;
}
.widget >>> .panel-title-bar-wrapper .search-bar-wrapper {
  top: 0;
}
</style>
