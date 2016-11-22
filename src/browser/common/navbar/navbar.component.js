import template from './navbar.html';
import controller from './navbar.controller';
import './navbar.scss';

let navbarComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    controllerAs: 'vm'
  };
};

export default navbarComponent;
