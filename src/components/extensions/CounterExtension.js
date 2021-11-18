import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './Counter.vue';

export default Node.create({
  name: 'counter',
  group: 'block',
  atom: true,

  addCommands() {
    return {
      dashyAddCounter: () => ({ chain }) => {
        return chain().insertContent('<counter/>').run();
      },
    }
  },

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'counter',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['counter', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
})
