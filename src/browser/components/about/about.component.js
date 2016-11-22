import template from './about.html';
import controller from './about.controller';
import './about.scss';

let aboutComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    link: aboutComponentLink
  };
};

function aboutComponentLink() {}

export default aboutComponent;
