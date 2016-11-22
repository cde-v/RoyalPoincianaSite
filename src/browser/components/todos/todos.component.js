import template from './todos.html';
import controller from './todos.controller';
import './todos.scss';

let todosComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    controllerAs: 'vmm'
  };
};

export default todosComponent;
