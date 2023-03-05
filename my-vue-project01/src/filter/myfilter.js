import Vue from 'vue';
import tools from '../js/tools';

Vue.filter('formatDate', function (value, format) {
  return value ? tools.formatDate(value, format) : '';
});

Vue.filter('formatFileSize', function (value) {
  return tools.formatFileSize(value);
});
