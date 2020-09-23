import '../index.css';

import $ from 'jquery';
import template from './template';


const main = function () {
  template.render();
  template.bindEventHandlers();
};

$(main);