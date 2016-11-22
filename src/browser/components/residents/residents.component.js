import template from './residents.html';
import controller from './residents.controller';
import './residents.scss';

let residentsComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    link: residentsComponentLink
  };
};

function residentsComponentLink() {
}

export default residentsComponent;
