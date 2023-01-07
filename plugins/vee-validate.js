import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import { required } from "vee-validate/dist/rules";
import ja from 'vee-validate/dist/locale/ja.json';

// 日本語化
localize('ja', ja);

// Add a rule.
extend("required", required);

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);