import { Node, mergeAttributes } from '@tiptap/core';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { PluginKey } from 'prosemirror-state';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './Property.vue';

export const PropertyPluginKey = new PluginKey('property');

export default Node.create({
  name: 'property',

  defaultOptions: {
    HTMLAttributes: {},
    renderLabel({ options, node }) {
      return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}}}`;
    },
    suggestion: {
      char: '{{',
      pluginKey: PropertyPluginKey,
      command: ({ editor, range, props }) => {
        // increase range.to by one when the next node is of type "text"
        // and starts with a space character
        const nodeAfter = editor.view.state.selection.$to.nodeAfter;
        const overrideSpace = nodeAfter?.text?.startsWith(' ');

        if (overrideSpace) {
          range.to += 1
        }

        editor
          .chain()
          .focus()
          .insertContentAt(range, [
            {
              type: 'property',
              attrs: props,
            },
            {
              type: 'text',
              text: ' ',
            },
          ])
          .run()
      },
      allow: ({ editor, range }) => {
        return editor.can().insertContentAt(range, { type: 'property' })
      },
    },
  },

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }

          return {
            'data-id': attributes.id,
          }
        },
      },

      label: {
        default: null,
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {};
          }

          return {
            'data-label': attributes.label,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'property[data-property]',
      },
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'property',
      mergeAttributes({ 'data-property': '' }, this.options.HTMLAttributes, HTMLAttributes),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ]
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isProperty = false;
        const { selection } = state;
        const { empty, anchor } = selection;

        if (!empty) {
          return false;
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isProperty = true;
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize);

            return false;
          }
        })

        return isProperty;
      }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
