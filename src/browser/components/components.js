import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Residents from './residents/residents';
import Todos from './todos/todos';

const componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Residents.name,
  Todos.name
]);

export default componentModule;
