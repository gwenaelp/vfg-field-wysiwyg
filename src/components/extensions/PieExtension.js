import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './Pie.vue';

export default Node.create({
  name: 'pie',
  group: 'block',
  atom: true,

  addCommands() {
    return {
      dashyAddPie: () => ({ chain }) => {
        return chain().insertContent('<pie/>').run();
      },
    }
  },

  addAttributes() {
    return {
      pie: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'pie',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['pie', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
})
