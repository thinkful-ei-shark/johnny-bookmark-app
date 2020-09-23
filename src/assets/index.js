import '../index.css';

import $ from 'jquery';
import template from './template';
import api from './api';


const main = function () {
  api.getItems()
    .then(items => {
      console.log(items);
    });
  template.render();
  template.bindEventHandlers();
};

$(main);