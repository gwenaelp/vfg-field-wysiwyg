import { storiesOf } from "@storybook/vue";

// Add more stories here to live develop your components
storiesOf("1- Simple", module).add("Simple wysiwyg", () => {
  return {
    data: function() {
      return {
        model: {
          array: []
        },
        schema: {
          fields: [
            {
              type: "wysiwyg",
              label: "wysiwyg field",
              model: "value"
            }
          ]
        }
      };
    },

    template: `
      <div>
        <h1>Form</h1>
        <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
        <h1>Generated Value</h1>
        <pre>{{model.array}}</pre>
        <h1>Schema</h1>
        <pre>{{schema}}</pre>
      </div>
    `
  };
});
