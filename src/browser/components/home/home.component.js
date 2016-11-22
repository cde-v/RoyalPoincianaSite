import template from './home.html';
import controller from './home.controller';
import './home.scss';

let homeComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    controllerAs: 'vmm'
  };
};

export default homeComponent;
