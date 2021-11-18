import { configure } from '@storybook/vue';
import Vue from 'vue';

// Import your custom components.
import FieldWysiwyg from '../src/lib-components/field-wysiwyg';

import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

// Install this library
Vue.component('field-wysiwyg', FieldWysiwyg);
Vue.use(Buefy);
Vue.use(VueFormGenerator);

// Install Vue plugins
// ex: Vue.use(vuex)

// Load stories
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
