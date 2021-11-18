import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './Widget.vue';

export default Node.create({
  name: 'widget',
  group: 'block',
  atom: true,

  addCommands() {
    return {
      dashyAddWidget: () => ({ chain }) => {
        return chain().insertContent('<widget/>').run();
      },
    }
  },

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      panelConfig: {
        default: '{}',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'widget',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['widget', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
})
