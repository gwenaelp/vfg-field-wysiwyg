import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './FilePreview.vue';

export default Node.create({
  name: 'file',
  group: 'block',
  atom: true,

  addCommands() {
    return {
      dashyAddFilePreview: () => ({ chain }) => {
        return chain().insertContent('<file/>').run();
      },
    }
  },

  addAttributes() {
    return {
      file: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'file',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['file', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
})
