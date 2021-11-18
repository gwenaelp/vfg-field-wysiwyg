<template>
  <div class="editor">
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <span class="field has-addons">
        <p class="control">
          <a class="button is-small" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
          </a>
        </p>
        <p class="control">
          <a class="button is-small" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            Italic
          </a>
        </p>
        <p class="control">
          <a class="button is-small" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            Strike
          </a>
        </p>
      </span>
    </bubble-menu>

    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <span class="field has-addons">
        <p class="control">
          <button class="button is-small" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            H1
          </button>
        </p>
        <p class="control">
          <button class="button is-small" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            H2
          </button>
          <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true, resizable: true }).run()">
            insertTable
          </button>

        </p>
        <p class="control components-dropdown">
          <b-dropdown aria-role="list">
            <template #trigger="{ active }">
              <button class="button is-small">
                Composants
                <i class="mdi mdi-menu-down" />
              </button>
            </template>
            <b-dropdown-item aria-role="listitem" @click="editor.chain().focus().dashyAddCounter().run()">
              <div style="font-weight: bold">
                Compteur
              </div>
              <span style="color: #777">
                Un compteur avec un bouton pour l'incrémenter (expérimental)
              </span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="editor.chain().focus().dashyAddFilePreview().run()">
              <div style="font-weight: bold">
                Fichier
              </div>
              <span style="color: #777">
                Un lien vers un fichier uploadé sur la plateforme. (expérimental, sauvegarde non fonctionnelle)
              </span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="editor.chain().focus().dashyAddPie().run()">
              <div style="font-weight: bold">
                Pie Chart
              </div>
              <span style="color: #777">
              </span>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="editor.chain().focus().dashyAddWidget().run()">
              <div style="font-weight: bold">
                Widget
              </div>
              <span style="color: #777">
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </p>
      </span>
    </floating-menu>
    <editor-content :editor="editor" />
  </div>
</template>
<script>
import tippy from 'tippy.js';
import { abstractField } from 'vue-form-generator';
//import CounterExtension from './extensions/CounterExtension';
//import FilePreviewExtension from './extensions/FilePreviewExtension';
//import PieExtension from './extensions/PieExtension';
//import WidgetExtension from './extensions/WidgetExtension';
//import PropertyExtension from './extensions/PropertyExtension';
//import PropertyList from './extensions/PropertyList.vue';

//import scanComponentVars from '@/core/utils/scanComponentVars';

import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  VueRenderer,
} from '@tiptap/vue-2';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import StarterKit from '@tiptap/starter-kit';

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },
  mixins: [abstractField],
  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.value || '',
      extensions: [
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
/*        CounterExtension,
        FilePreviewExtension,
        PieExtension,
        //WidgetExtension,
        PropertyExtension.configure({
          suggestion: {
            items: query => {
              return scanComponentVars(this.$parent.$parent).filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);
            },
            render: () => {
              let component;
              let popup;
              return {
                onStart: props => {
                  component = new VueRenderer(PropertyList, {
                    // using vue 2:
                    parent: this,
                    propsData: props,
                    props,
                    editor: props.editor,
                  });

                  popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => this.$el,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                  });
                },
                onUpdate(props) {
                  component.updateProps(props);
                  popup[0].setProps({ getReferenceClientRect: props.clientRect });
                },
                onKeyDown(props) {
                  if (props.event.key === 'Escape') {
                    popup[0].hide();

                    return true;
                  }

                  return component.ref?.onKeyDown(props);
                },
                onExit() {
                  popup[0].destroy();
                  component.destroy();
                },
              }
            }
          },
        }),*/
      ],
      onUpdate: () => { this.value = this.editor.getHTML(); },
    });
  },
};
</script>

<style scoped>
.editor {
  color: #363636;
  border-radius: 4px;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  background: #f9f9f9;
  line-height: 34px;
}
.editor >>> .ProseMirror {
  padding:  20px;
  width:  100%;
}
.editor >>> p {
}
.editor >>> h1 {
  font-weight: bold;
  font-size:  140%;
  color: black;
}
.editor >>> h2 {
  font-weight: bold;
  color: black;
}
.editor >>> h1::before {
  content:  '#';
  color:  #ccc;
  padding-right:  6px;
}
.editor >>> h2::before {
  content:  '##';
  color:  #ccc;
  padding-right:  6px;
}
.floating-menu {
  margin-left:  30px;
}
.components-dropdown >>> .dropdown-content {
  margin-left: 120px;
  margin-top: -40px;
}
.editor >>> .table-view th {
  top: 0;
}
.editor >>> .pagination-bar {
  position: static;
}
.editor >>> .ProseMirror table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #adf;
  pointer-events: none;
}
.editor >>> .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.editor >>> .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

.editor >>> table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
}
.editor >>> td {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

    }

.editor >>> .tableWrapper table td, .editor >>> .tableWrapper table th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
</style>
